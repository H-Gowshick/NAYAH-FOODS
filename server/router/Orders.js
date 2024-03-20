const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const OrderModel = require("../model/OrderModel");
const ProductModel = require("../model/ProductModel");

router.post('/orders', async (req, res) => {
  try {
      const { UserId, ProductCodeAndQuantity } = req.body;

      console.log(ProductCodeAndQuantity)

      // Check if there is an existing order for the given UserId with OrderConfirmation set to false
      const existingOrder = await OrderModel.findOne({ UserId: UserId, OrderConfirmation: false });

      if (existingOrder) {
          // Update the ProductCodeAndQuantity in the existing order
          existingOrder.ProductCodeAndQuantity = ProductCodeAndQuantity;
          await existingOrder.save();

          res.status(200).json({ success: true, message: 'Order updated successfully' });
      } else {
          // Create a new order instance
          const newOrder = new OrderModel({
              UserId,
              ProductCodeAndQuantity,
          });

          // Save the new order to the database
          await newOrder.save();

          res.status(201).json({ success: true, message: 'New order added successfully' });
      }
  } catch (error) {
      console.error('Error adding/updating order:', error.message);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.get('/allorders/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch orders for the specified user from the database
        const orders = await OrderModel.find({ UserId: userId, OrderConfirmation: false });

        // Create an array to store the orders with product details
        const ordersWithProductDetails = [];

        // Iterate through each order
        for (const order of orders) {
            // Fetch product details for each product code in the order
            const productDetails = await ProductModel.find({ code: { $in: order.ProductCodeAndQuantity.map(item => item.code) } });

            // Create an updated order object with product details
            const orderWithDetails = {
                ...order.toObject(),
                ProductDetails: productDetails,
            };

            // Add the updated order to the array
            ordersWithProductDetails.push(orderWithDetails);
        }

        res.status(200).json({ success: true, orders: ordersWithProductDetails });
    } catch (error) {
        console.error('Error retrieving orders:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/updateOrderDetails', async (req, res) => {
    const { orderId, updatedProductCodeAndQuantity } = req.body;

    try {
        const order = await OrderModel.findById(orderId);

        if (!order) {
            console.log('Order not found:', orderId);
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        // Fetch product details for the updated product codes
        const productDetails = await ProductModel.find({ code: { $in: order.ProductCodeAndQuantity.map(item => item.code) } });
        
        if (!productDetails) {
            console.log('Product details not found for codes:');
        }

        // Filter out products with quantity 0
        const filteredProductCodeAndQuantity = {};
        Object.keys(updatedProductCodeAndQuantity).forEach(productCode => {
            const quantity = updatedProductCodeAndQuantity[productCode];
            if (quantity > 0) {
                filteredProductCodeAndQuantity[productCode] = quantity;
            }
        });

        // Recalculate TotalCost based on the updated quantities
        let totalCost = 0;
        productDetails.forEach(item => {
            const quantity = filteredProductCodeAndQuantity[item.ProductCode] || 0;
            console.log(quantity);
            totalCost += item.Price * quantity;
        });

        console.log('Updated Product Code and Quantity:', filteredProductCodeAndQuantity);
        console.log('Calculated Total Cost:', totalCost);

        order.ProductCodeAndQuantity = filteredProductCodeAndQuantity;
        order.ProductDetails = productDetails;
        order.TotalCost = totalCost;

        await order.save();

        console.log('Order details updated successfully');

        return res.json({ success: true, message: 'Order details updated successfully' });
    } catch (error) {
        console.error('Error updating order details:', error.message);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.put('/updateAddress/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const { FirstName, LastName, MobileNumber, Address, Landmark, TownOrCity, State, Pincode } = req.body;
  
      // Check if there is an order with OrderConfirmation false
      const hasUnconfirmedOrder = await OrderModel.exists({ UserId: userId, OrderConfirmation: false });
  
      if (hasUnconfirmedOrder) {
        // Assume user exists, you might want to add user existence validation
        await OrderModel.updateOne({ UserId: userId }, {
            FirstName,
            LastName,
            MobileNumber,
            Address,
            Landmark,
            TownOrCity,
            State,
            Pincode,
        });
  
        res.status(200).json({ success: true, message: 'User address updated successfully' });
      } else {
        res.status(400).json({ success: false, error: 'No unconfirmed orders found for the user' });
      }
    } catch (error) {
      console.error('Error updating address:', error.message);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  router.put('/updateOrderConfirmation/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Assuming you want to update the first order found with the provided UserId
      const order = await OrderModel.findOne({ UserId: userId, OrderConfirmation: false });
  
      if (order) {
        order.OrderConfirmation = true;
        await order.save();
  
        res.json({ success: true, message: 'Order confirmation updated successfully.' });
      } else {
        res.status(404).json({ success: false, message: 'Order not found.' });
      }
    } catch (error) {
      console.error('Error updating order confirmation:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });
  

module.exports = router;

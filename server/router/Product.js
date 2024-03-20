const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const ProductModel = require("../model/ProductModel");

// Helper function to generate a unique ProductCode
const generateUniqueProductCode = async (productName) => {
  let isUnique = false;
  let productCode;

  while (!isUnique) {
    productCode = generateProductCode(productName);
    const existingProduct = await ProductModel.findOne({ ProductCode: productCode });

    if (!existingProduct) {
      isUnique = true;
    }
  }

  return productCode;
};

// Helper function to generate a unique ProductCode based on the product name
const generateProductCode = (productName) => {
  const formattedName = productName.toLowerCase().replace(/\s/g, '');
  const firstTwoChars = formattedName.slice(0, 2);
  const randomDigits = generateRandomDigits(3);
  return `${firstTwoChars}${randomDigits}`;
};

// Helper function to generate random digits of a specified length
const generateRandomDigits = (length) => {
  const min = 100;
  const max = 999;
  return Math.floor(min + Math.random() * (max - min + 1));
};

router.post('/products', async (req, res) => {
  try {
    const { ProductImage, ProductName, Price } = req.body;

    // Generate a unique ProductCode
    const ProductCode = await generateUniqueProductCode(ProductName);

    // Create a new product instance
    const newProduct = new ProductModel({
      ProductImage,
      ProductName,
      ProductCode,
      Price,
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.get('/allproducts', async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await ProductModel.find();
  
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;

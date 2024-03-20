import React, { useEffect, useState } from "react";
import DeleteIcon from "../images/DeleteIcon.png";
import PaymentComponent from "../components/PaymentComponent";
import FooterBar from "../components/Footer";

function CartPage() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/allorders/${userId}`
      );
      const data = await response.json();
      if (data.success) {
        const updatedOrders = data.orders.map((order) => ({
          ...order,
          TotalCost: calculateTotalCost(order),
        }));
        setOrders(updatedOrders);
        console.log(updatedOrders);
      } else {
        console.error("Error fetching orders:", data.error);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  const updateOrderDetails = async (orderId, updatedProductCodeAndQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/updateOrderDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            updatedProductCodeAndQuantity,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchOrders();
        console.log("Update successful:", data.message);
      } else {
        console.error("Update failed:", data.error);
      }
    } catch (error) {
      console.error("Error updating order details:", error.message);
    }
  };
  const updateProductCodeAndQuantity = (
    orderIndex,
    updatedProductCodeAndQuantity
  ) => {
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].ProductCodeAndQuantity[0] =
      updatedProductCodeAndQuantity;
    const orderId = updatedOrders[orderIndex]._id;
    updateOrderDetails(orderId, updatedProductCodeAndQuantity);

    setOrders(updatedOrders);
  };

  const calculateTotalCost = (order) => {
    let totalCost = 0;
    order.ProductDetails.forEach((item) => {
      const quantity = order.ProductCodeAndQuantity[0][item.ProductCode] || 0;
      totalCost += item.Price * quantity;
    });
    return totalCost;
  };

  const handleDecrease = (orderIndex, itemIndex) => {
    const updatedProductCodeAndQuantity = {
      ...orders[orderIndex].ProductCodeAndQuantity[0],
    };
    const currentItem = orders[orderIndex].ProductDetails[itemIndex];
    const currentQuantity =
      updatedProductCodeAndQuantity[currentItem.ProductCode] || 0;

    if (currentQuantity > 1) {
      updatedProductCodeAndQuantity[currentItem.ProductCode] =
        currentQuantity - 1;
      updateProductCodeAndQuantity(orderIndex, updatedProductCodeAndQuantity);
    }
  };

  const handleIncrease = (orderIndex, itemIndex) => {
    const updatedProductCodeAndQuantity = {
      ...orders[orderIndex].ProductCodeAndQuantity[0],
    };
    const currentItem = orders[orderIndex].ProductDetails[itemIndex];
    const currentQuantity =
      updatedProductCodeAndQuantity[currentItem.ProductCode] || 0;

    updatedProductCodeAndQuantity[currentItem.ProductCode] =
      currentQuantity + 1;
    updateProductCodeAndQuantity(orderIndex, updatedProductCodeAndQuantity);
  };

  const handleQuantityChange = (orderIndex, itemIndex, newQuantity) => {
    const updatedProductCodeAndQuantity = {
      ...orders[orderIndex].ProductCodeAndQuantity[0],
    };
    const currentItem = orders[orderIndex].ProductDetails[itemIndex];

    const parsedQuantity = parseInt(newQuantity, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
      updatedProductCodeAndQuantity[currentItem.ProductCode] = parsedQuantity;
      updateProductCodeAndQuantity(orderIndex, updatedProductCodeAndQuantity);
    }
  };

  const handleDelete = (orderIndex, itemIndex) => {
    const currentItem = orders[orderIndex].ProductDetails[itemIndex];

    // Filter out the item from the ProductCodeAndQuantity array
    const updatedProductCodeAndQuantity = {
      ...orders[orderIndex].ProductCodeAndQuantity[0],
      [currentItem.ProductCode]: undefined,
    };

    // Remove the item from the ProductDetails array
    const updatedProductDetails = orders[orderIndex].ProductDetails.filter(
      (item, index) => index !== itemIndex
    );

    // Update the order details with the modified ProductCodeAndQuantity and ProductDetails
    updateProductCodeAndQuantity(
      orderIndex,
      updatedProductCodeAndQuantity,
      updatedProductDetails
    );
  };

  return (
    <>
      <div className="py-5" style={{ background: "#F3DBB9" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="p-1 my-2 cartbg">
                <div className="py-3 px-3">
                  <h6>
                    <b>ORDER SUMMARY</b>
                  </h6>
                  <div className="row mx-2">
                    <div className="col-md-6 col-6">
                      <p className="text-center">ITEMS</p>
                    </div>
                    <div className="col-md-2 col-2">
                      <p className="text-center">QTY</p>
                    </div>
                    <div className="col-md-2 col-2">
                      <p className="text-center">PRICE</p>
                    </div>
                    <div className="col-md-2 col-2">
                      <p className="text-center">REMOVE</p>
                    </div>
                  </div>
                  {orders.length === 0 ? (
                    <div
                      className="d-flex justify-content-center align-items-center "
                      style={{
                        borderRadius: "10px",
                        background: "#FFF",
                        minHeight: "400px",
                      }}
                    >
                      <p className="text-center">
                        No products added to the cart yet.
                      </p>
                    </div>
                  ) : (
                    orders.map((order, orderIndex) => (
                      <div
                        key={order._id}
                        style={{
                          borderRadius: "10px",
                          background: "#FFF",
                        }}
                      >
                        {order.ProductDetails.map((item, itemIndex) => {
                          const quantity =
                            order.ProductCodeAndQuantity[0][item.ProductCode] ||
                            0;

                          // Check if quantity is greater than 0 before rendering the product
                          if (quantity > 0) {
                            return (
                              <div
                                key={item._id}
                                className="row p-2 border-bottom"
                              >
                                <div className="col-md-6 col-6">
                                  <div className="row">
                                    <div className="col-md-4 col-12">
                                      <img
                                        src={item.ProductImage}
                                        width="80px"
                                        alt={item.ProductName}
                                      />
                                    </div>
                                    <div className="col-md-8 col-12 d-flex align-items-center">
                                      <h5>{item.ProductName}</h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-2 col-2 d-flex align-items-center">
                                  <div className="row d-flex justify-content-evenly">
                                    <div className="col-md-3 col-12 d-flex justify-content-center align-items-center">
                                      <button
                                        onClick={() =>
                                          handleDecrease(orderIndex, itemIndex)
                                        }
                                        style={{
                                          background: "var(--white, #F5F2ED)",
                                          borderRadius: "50px",
                                          fontWeight: "bold",
                                          border: "none",
                                        }}
                                      >
                                        -
                                      </button>
                                    </div>
                                    <div className="col-md-4 col-12 d-flex justify-content-center">
                                      <input
                                        type="text"
                                        style={{
                                          background: "var(--white, #FFC6C5)",
                                          borderRadius: "50px",
                                          fontWeight: "bold",
                                          width: "30px",
                                          textAlign: "center",
                                          border: "none",
                                        }}
                                        value={quantity}
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            orderIndex,
                                            itemIndex,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="col-md-3 col-12 d-flex justify-content-center">
                                      <button
                                        onClick={() =>
                                          handleIncrease(orderIndex, itemIndex)
                                        }
                                        style={{
                                          background: "var(--white, #F5F2ED)",
                                          borderRadius: "50px",
                                          fontWeight: "bold",
                                          border: "none",
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-2 col-2 d-flex justify-content-center align-items-center">
                                  <h6 className="">₹{item.Price}</h6>
                                </div>
                                <div className="col-md-2 col-2 d-flex pl-2 justify-content-center align-items-center">
                                  <img
                                    onClick={() =>
                                      handleDelete(orderIndex, itemIndex)
                                    }
                                    src={DeleteIcon}
                                    width="40px"
                                    alt="Delete"
                                  />
                                </div>
                              </div>
                            );
                          }

                          // If quantity is 0, don't render the product
                          return null;
                        })}
                        <div className="d-flex justify-content-end">
                          <h5 className="p-2">
                            <b>TOTAL</b>&nbsp; ₹{order.TotalCost}
                          </h5>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="p-1 my-2 cartbg">
                {/* Dynamically pass the total cost to PaymentComponentWithProps */}
                {orders.length === 0 ? (
                  <PaymentComponent />
                ) : (
                  orders.map((order, index) => (
                    <PaymentComponent key={index} total={order.TotalCost} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
}

export default CartPage;

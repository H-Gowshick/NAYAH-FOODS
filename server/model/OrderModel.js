const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// Define the schema for admin login
const OrderSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        trim: true,
    },
    ProductCodeAndQuantity: {
        type: Array,
        required: true,
        trim: true,
    },
    TotalCost: {
        type: Number,
        default: null, // Set default value to null
        trim: true,
    },
    OrderConfirmation: {
        type: Boolean,
        default: false,
    },
    FirstName: {
        type: String,
        default: null, // Set default value to null
        trim: true,
    },
    LastName: {
        type: String,
        default: null, // Set default value to null
        trim: true,
    },
    MobileNumber: {
        type: String,
        default: null, // Set default value to null
        trim: true,
    },
    Address: {
        type: String,
        default: null, // Set default value to null
        trim: true,
    },
    Landmark: {
        type: String,
        default: null, // Set default value to null
        trim: true,
    },
    TownOrCity: {
        type: String,
        default: null, // Set default value to null
        trim: true,
    },
    State: {
        type: String,
        default: null, // Set default value to null
        trim: true,
    },
    Pincode: {
        type: String,
        default: null, // Set default value to null
        trim: true,
    },
});


// Create the AdminLogin model
const Orders = mongoose.model("orders", OrderSchema);

module.exports = Orders;

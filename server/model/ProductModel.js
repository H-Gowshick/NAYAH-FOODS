const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// Define the schema for admin login
const productSchema = new mongoose.Schema({
    ProductImage:{
        type: String,
        required: true,
        trim: true,
    },
    ProductName: {
        type: String,
        required: true,
        trim: true,
    },
    ProductCode:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    Price:{
        type: Number,
        required: true,
        trim: true,
    }
});


// Create the AdminLogin model
const Product = mongoose.model("product", productSchema);

module.exports = Product;

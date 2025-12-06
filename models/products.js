const express = require("express");
const mongoose = require("mongoose");

const products = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    }
});

const Products = mongoose.model("Products", products);

module.exports = Products;
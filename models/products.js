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
    imageUrl: {
        type: String,
    }
});

const Products = mongoose.model("Products", products);

module.exports = Products;
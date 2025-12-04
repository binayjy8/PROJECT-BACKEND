const express = require("express");
const mongoose = require("mongoose");

const products = mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    }
})
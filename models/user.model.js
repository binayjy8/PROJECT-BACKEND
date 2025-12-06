const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    country: {
        type: String,
    },
    phone: {
        type: String,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
});

const cartItem = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product",
    },
    qty: {
        type: Number, default: 1,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    }
});
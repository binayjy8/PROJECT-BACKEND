const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    phone: { type: String },
    isDefault: { type: Boolean, default: false },
});

const cartItem = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    qty: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false, // never returned by default in queries
    },
    phone: {
        type: String,
        match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
    address: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    cart: [cartItem],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
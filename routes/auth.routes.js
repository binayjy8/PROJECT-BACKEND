const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");


router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            data: {
                token,
                user: { id: newUser._id, name: newUser.name, email: newUser.email },
            },
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);

        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern || {})[0] || "field";
            return res.status(409).json({ message: `${duplicateField} already registered` });
        }
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ message: messages.join(", ") });
        }
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email },
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

router.post("/logout", verifyToken, (req, res) => {
    res.json({ message: "Logged out successfully" });
});

router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ data: { user } });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
});

module.exports = router;
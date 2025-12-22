const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { initializeDatabase } = require("./DB/db.connect.js");
const Products = require("./models/products.js");
const Category = require("./models/category.model.js");
const Order = require("./models/order.model.js"); 

const corsOptions = {
    origin: "*",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

// GET all products
app.get("/api/products", async (req, res) => {
   try{
    const products = await Products.find({}).populate('category');
    if(products && products.length > 0){
        res.json({ data: { products } });
    } else {
        res.status(404).json({ error: "Products not found"});
    }
   } catch(error) {
    res.status(500).json({message: "Failed to fetch products"});
   }
});

// GET product by ID
app.get("/api/products/:productId", async (req, res) => {
    try{
        const product = await Products.findById(req.params.productId).populate('category');
        if(product){
            res.json({ data: { product } });
        } else {
            res.status(404).json({ error: "Product not found"});
        }
    } catch(error) {
        res.status(500).json({message: "Failed to fetch product"});
    }
});

// ========== CATEGORIES ROUTES ==========

// GET all categories
app.get("/api/categories", async (req, res) => {
    try{
        const categories = await Category.find({});
        if(categories && categories.length > 0){
            res.json({ data: { categories } });
        } else {
            res.status(404).json({ error: "Categories not found"});
        }
    } catch(error) {
        res.status(500).json({message: "Failed to fetch categories"});
    }
});

// GET category by ID
app.get("/api/categories/:categoryId", async (req, res) => {
    try{
        const category = await Category.findById(req.params.categoryId);
        if(category){
            res.json({ data: { category } });
        } else {
            res.status(404).json({ error: "Category not found"});
        }
    } catch(error) {
        res.status(500).json({message: "Failed to fetch category"});
    }
});

// ========== ORDER ROUTES ========== ✅ ADD THESE ROUTES

// POST - Create Order
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ data: { order: newOrder } });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// GET - Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ data: { orders } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// GET - Get order by ID
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order) {
      res.json({ data: { order } });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
});
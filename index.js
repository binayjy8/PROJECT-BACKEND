const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { initializeDatabase } = require("./DB/db.connect.js");
const Products = require("./models/products.js");
const Category = require("./models/category.model.js");
const Order = require("./models/order.model.js"); // ✅ ADD THIS

const corsOptions = {
    origin: "*",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

// const seedDatabase = async () => {
//   try {
//     await Products.deleteMany({});
//     await Category.deleteMany({});
//     console.log("🗑️ Existing products & categories deleted");
    

//     // ===== CREATE CATEGORIES =====
//     const menCategory = await Category.create({
//       name: "Men",
//       description: "Men's clothing and accessories"
//     });

//     const womenCategory = await Category.create({
//       name: "Women",
//       description: "Women's clothing and accessories"
//     });

//     const kidsCategory = await Category.create({
//       name: "Kids",
//       description: "Kids clothing and footwear"
//     });

//     const electronicsCategory = await Category.create({
//       name: "Electronics",
//       description: "Electronic gadgets and accessories"
//     });

//     const homeCategory = await Category.create({
//       name: "Home",
//       description: "Home decor and essentials"
//     });

//     // ===== PRODUCTS (20) =====
//     const products = [
//       {
//         name: "Men's Cotton T-Shirt",
//         description: "Comfortable cotton t-shirt for daily wear",
//         price: 599,
//         imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
//         category: menCategory._id,
//         rating: 4.5,
//         inStock: true
//       },
//       {
//         name: "Men's Denim Jeans",
//         description: "Classic blue denim jeans",
//         price: 1299,
//         imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
//         category: menCategory._id,
//         rating: 4.2,
//         inStock: true
//       },
//       {
//         name: "Men's Casual Hoodie",
//         description: "Warm fleece hoodie",
//         price: 1199,
//         imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
//         category: menCategory._id,
//         rating: 4.4,
//         inStock: true
//       },
//       {
//         name: "Men's Formal Shirt",
//         description: "Slim-fit formal shirt",
//         price: 999,
//         imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
//         category: menCategory._id,
//         rating: 4.3,
//         inStock: true
//       },

//       {
//         name: "Women's Summer Dress",
//         description: "Light summer dress",
//         price: 899,
//         imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
//         category: womenCategory._id,
//         rating: 4.7,
//         inStock: true
//       },
//       {
//         name: "Women's Handbag",
//         description: "Elegant leather handbag",
//         price: 1599,
//         imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
//         category: womenCategory._id,
//         rating: 4.8,
//         inStock: true
//       },
//       {
//         name: "Women's Kurti",
//         description: "Printed cotton kurti",
//         price: 799,
//         imageUrl: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400",
//         category: womenCategory._id,
//         rating: 4.6,
//         inStock: true
//       },
//       {
//         name: "Women's Sneakers",
//         description: "Comfortable sneakers",
//         price: 1499,
//         imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
//         category: womenCategory._id,
//         rating: 4.5,
//         inStock: true
//       },

//       {
//         name: "Kids Cartoon T-Shirt",
//         description: "Cartoon printed t-shirt",
//         price: 399,
//         imageUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400",
//         category: kidsCategory._id,
//         rating: 4.3,
//         inStock: true
//       },
//       {
//         name: "Kids Sneakers",
//         description: "Lightweight sneakers",
//         price: 699,
//         imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
//         category: kidsCategory._id,
//         rating: 4.4,
//         inStock: true
//       },

//       {
//         name: "Wireless Headphones",
//         description: "Noise-cancelling headphones",
//         price: 2499,
//         imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
//         category: electronicsCategory._id,
//         rating: 4.6,
//         inStock: true
//       },
//       {
//         name: "Smart Watch",
//         description: "Fitness smart watch",
//         price: 3999,
//         imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
//         category: electronicsCategory._id,
//         rating: 4.5,
//         inStock: true
//       },

//       {
//         name: "Decorative Wall Art",
//         description: "Modern wall painting",
//         price: 1899,
//         imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400",
//         category: homeCategory._id,
//         rating: 4.4,
//         inStock: true
//       },
//       {
//         name: "Wooden Table Lamp",
//         description: "Minimalist table lamp",
//         price: 1299,
//         imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
//         category: homeCategory._id,
//         rating: 4.5,
//         inStock: true
//       }
//     ];

//     await Products.insertMany(products);
//     console.log("✅ Database seeded successfully");
//   } catch (error) {
//     console.error("❌ Seeding failed:", error.message);
//   }
// };

// seedDatabase();

// ========== PRODUCTS ROUTES ==========

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
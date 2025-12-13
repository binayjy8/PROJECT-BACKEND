const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { initializeDatabase } = require("./DB/db.connect.js");
const Products = require("./models/products.js");
const Category = require("./models/category.model.js");

const corsOptions = {
    origin: "*",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

// ========== PRODUCTS ROUTES ==========

const seedDatabase = async () => {

  // Clear existing data
  await Category.deleteMany({});
  await Products.deleteMany({});

  // Create Categories
  const menCategory = await Category.create({
    name: "Men",
    description: "Men's clothing and accessories"
  });

  const womenCategory = await Category.create({
    name: "Women",
    description: "Women's clothing and accessories"
  });

  const kidsCategory = await Category.create({
    name: "Kids",
    description: "Kids clothing and toys"
  });

  const electronicsCategory = await Category.create({
    name: "Electronics",
    description: "Electronic devices and gadgets"
  });

  const homeCategory = await Category.create({
    name: "Home",
    description: "Home decor and furniture"
  });

  // Create Products
  const products = [
    {
      name: "Men's Cotton T-Shirt",
      description: "Comfortable cotton t-shirt for daily wear",
      price: 599,
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      category: menCategory._id,
      rating: 4.5,
      inStock: true
    },
    {
      name: "Men's Denim Jeans",
      description: "Classic blue denim jeans",
      price: 1299,
      imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      category: menCategory._id,
      rating: 4.2,
      inStock: true
    },
    {
      name: "Women's Summer Dress",
      description: "Light and breezy summer dress",
      price: 899,
      imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
      category: womenCategory._id,
      rating: 4.7,
      inStock: true
    },
    {
      name: "Women's Handbag",
      description: "Elegant leather handbag",
      price: 1599,
      imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
      category: womenCategory._id,
      rating: 4.8,
      inStock: true
    },
    {
      name: "Kids Cartoon T-Shirt",
      description: "Colorful cartoon printed t-shirt",
      price: 399,
      imageUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400",
      category: kidsCategory._id,
      rating: 4.3,
      inStock: true
    },
    {
      name: "Wireless Headphones",
      description: "Premium noise-cancelling headphones",
      price: 2499,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      category: electronicsCategory._id,
      rating: 4.6,
      inStock: true
    },
    {
      name: "Smart Watch",
      description: "Fitness tracker with heart rate monitor",
      price: 3999,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      category: electronicsCategory._id,
      rating: 4.5,
      inStock: true
    },
    {
      name: "Decorative Wall Art",
      description: "Modern abstract wall painting",
      price: 1899,
      imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400",
      category: homeCategory._id,
      rating: 4.4,
      inStock: true
    }
  ];

  await Products.insertMany(products);

  console.log("✅ Database seeded successfully!");
  process.exit(0);
};

// seedDatabase();

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

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
});
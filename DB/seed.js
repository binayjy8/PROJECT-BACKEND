// const mongoose = require("mongoose");
// const { initializeDatabase } = require("./db.connect");
// const Category = require("../models/category.model");
// const Products = require("../models/products");

// const seedDatabase = async () => {
//   await initializeDatabase();

//   // Clear existing data
//   await Category.deleteMany({});
//   await Products.deleteMany({});

//   // Create Categories
//   const menCategory = await Category.create({
//     name: "Men",
//     description: "Men's clothing and accessories"
//   });

//   const womenCategory = await Category.create({
//     name: "Women",
//     description: "Women's clothing and accessories"
//   });

//   const kidsCategory = await Category.create({
//     name: "Kids",
//     description: "Kids clothing and toys"
//   });

//   const electronicsCategory = await Category.create({
//     name: "Electronics",
//     description: "Electronic devices and gadgets"
//   });

//   const homeCategory = await Category.create({
//     name: "Home",
//     description: "Home decor and furniture"
//   });

//   // Create Products
//   const products = [
//     {
//       name: "Men's Cotton T-Shirt",
//       description: "Comfortable cotton t-shirt for daily wear",
//       price: 599,
//       imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
//       category: menCategory._id,
//       rating: 4.5,
//       inStock: true
//     },
//     {
//       name: "Men's Denim Jeans",
//       description: "Classic blue denim jeans",
//       price: 1299,
//       imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
//       category: menCategory._id,
//       rating: 4.2,
//       inStock: true
//     },
//     {
//       name: "Women's Summer Dress",
//       description: "Light and breezy summer dress",
//       price: 899,
//       imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
//       category: womenCategory._id,
//       rating: 4.7,
//       inStock: true
//     },
//     {
//       name: "Women's Handbag",
//       description: "Elegant leather handbag",
//       price: 1599,
//       imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
//       category: womenCategory._id,
//       rating: 4.8,
//       inStock: true
//     },
//     {
//       name: "Kids Cartoon T-Shirt",
//       description: "Colorful cartoon printed t-shirt",
//       price: 399,
//       imageUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400",
//       category: kidsCategory._id,
//       rating: 4.3,
//       inStock: true
//     },
//     {
//       name: "Wireless Headphones",
//       description: "Premium noise-cancelling headphones",
//       price: 2499,
//       imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
//       category: electronicsCategory._id,
//       rating: 4.6,
//       inStock: true
//     },
//     {
//       name: "Smart Watch",
//       description: "Fitness tracker with heart rate monitor",
//       price: 3999,
//       imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
//       category: electronicsCategory._id,
//       rating: 4.5,
//       inStock: true
//     },
//     {
//       name: "Decorative Wall Art",
//       description: "Modern abstract wall painting",
//       price: 1899,
//       imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400",
//       category: homeCategory._id,
//       rating: 4.4,
//       inStock: true
//     }
//   ];

//   await Products.insertMany(products);

//   console.log("✅ Database seeded successfully!");
//   process.exit(0);
// };

// seedDatabase();
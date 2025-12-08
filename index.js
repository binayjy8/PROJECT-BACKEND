const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const { initializeDatabase } = require("./DB/db.connect.js");
const Products = require("./models/products.js");

const corsOptions = {
    origin: "*",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

async function findAllData(){
     try{
        const data = await Products.find({});
        return data;
    } catch(error) {
        throw error;
    }
}

app.get("/data", async (req, res) => {
   try{
    const data = await findAllData();
    if(data && data.length > 0){
        res.json(data);
    } else {
        res.status(404).json({ error: "Products not found"});
    }
   } catch(error) {
    res.status(500).json({message: "Failed to fetch product"});
   }
});

async function updateData(productId, updatedData) {
    try{
        const updatedProduct = await Products.findByIdAndUpdate(productId, updateData, {new: true,});
        return updatedProduct;
    }catch(error){
        console.log("Error in updating data");
    }
}

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
});
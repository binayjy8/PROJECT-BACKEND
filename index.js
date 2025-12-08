const express = require("express");
const app = express();
const PORT = process.env.PORT;
require("dotenv").config();
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

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
});
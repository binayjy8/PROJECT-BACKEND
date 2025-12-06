const express = require("express");
const app = express();
const PORT = process.env.PORT;
require("dotenv").config();
const cors = require("cors");
const { initializeDatabase } = require("./DB/db.connect.js");

const corsOptions = {
    origin: "*",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
    res.send("working");
});

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
});
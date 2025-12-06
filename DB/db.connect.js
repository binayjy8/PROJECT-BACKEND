const mongoose = require("mongoose");
require("dotenv").config();

const mongouri = process.env.MONGODB;

const initializeDatabase = async () => {
    await mongoose.connect(mongouri).then(() => {
        console.log("connected to DB");
    }).catch((error) => "Error connecting to database", error);
};

module.exports = { initializeDatabase };
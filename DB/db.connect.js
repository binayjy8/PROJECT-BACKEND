const mongoose = require("mongoose");
require("dotenv").config();

const initializeDatabase = async () => {
    await mongoose.connect().then(() => {
        console.log("connected to DB");
    }).catch((error) => "Error connecting to database", error);
};

module.exports = { initializeDatabase };
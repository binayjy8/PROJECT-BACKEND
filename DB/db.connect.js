const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
require("dotenv").config();

const mongouri = process.env.MONGODB;

let isConnected = false;

const initializeDatabase = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(mongouri, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error connecting to database:", error);
        throw error;
    }
};

module.exports = { initializeDatabase };
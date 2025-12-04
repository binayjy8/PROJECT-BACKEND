const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { initializeDatabase } = require("./DB/db.connect.js");
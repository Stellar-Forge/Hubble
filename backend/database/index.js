require("dotenv").config({path: "../.env"})
const mongoose = require("mongoose")

DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)
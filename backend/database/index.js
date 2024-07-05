require("dotenv").config({path: "../.env"})
const mongoose = require("mongoose")

DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
})


const User = mongoose.model("User", UserSchema)

module.exports = { User } 
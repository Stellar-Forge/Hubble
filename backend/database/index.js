require("dotenv").config({path: "../.env"})
const mongoose = require("mongoose")

DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const WorkspaceSchema = new mongoose.Schema({
    username: String,
    currentWorkspace: Number,
    model: String,
    output: [String]
})

const User = mongoose.model("User", UserSchema)
const Workspace = mongoose.model("Workspace", WorkspaceSchema)

module.exports = { User, Workspace } 
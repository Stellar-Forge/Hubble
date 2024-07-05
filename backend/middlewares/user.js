const jwt = require("jsonwebtoken")
require("dotenv").config({path: "../.env"})
const { User } = require("../database/index")
const { userSchema } = require("../zod/types.js")

const JWT_SECRET = process.env.JWT_SECRET


function userAuthMiddleware(req, res, next) {

    const token = req.headers.authorization
    try {
        const decodedJSON = jwt.verify(token, JWT_SECRET)
        req.headers.username = decodedJSON.username
        next()
    }
    catch (e) {
        res.json({"msg": "Authentication failed!"})
    }

}

async function userSignup(req, res, next) {

    const { email } = req.body
    const response = await User.findOne({
        email
    })
    response ? res.json({"msg": "Email is already registered!"}) : next()

}

async function userSignin(req, res, next) {
    
    const { username, password } = req.body

    const response = await User.findOne({
        username,
        password
    })
    response ? next() : res.json({"msg": "Wrong Username or Password !"})

}

// Input Validation Middlewares 

function userSchemaValidation(req, res, next) {
    
    const { email, username, password } = req.body;
    const response = userSchema.safeParse({
        email, username, password
    })

    response.success ? next() : res.json({
        "msg": "Wrong Inputs"
    })

}


module.exports = { userAuthMiddleware, userSignin, userSignup, userSchemaValidation }
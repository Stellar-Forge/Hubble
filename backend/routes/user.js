const { Router } = require("express")
const router =  Router()
const { User } = require("../database/index.js")
const { userSignin, userSignup, userAuthMiddleware, userSchemaValidation} = require("../middlewares/user.js")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "../.env"})

const JWT_SECRET = process.env.JWT_SECRET

router.post("/signup", userSchemaValidation, userSignup, async (req, res) => {

    const { email, username, password } = req.body 
    
    await User.create({
        email,
        username,
        password
    })

    res.json({msg: "User created successfully!"})

})

router.post("/signin", userSignin, (req, res) => {

    const username = req.body.username
    const token = jwt.sign({username}, JWT_SECRET)

    res.json({token})

})

router.use(userAuthMiddleware)
// All routes below will use this middleware 

router.get("/pageauthcheck", (req, res) => {
    res.json({msg: "Allowed"})
})

router.post("/studio", (req, res) => {
    const prompt = req.body.prompt
    console.log(prompt)
    res.json({msg: "Welcome to studio"})
})


module.exports = router
require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
const userRouter = require("./routes/user.js")
const cors = require("cors")
// const adminRouter = require("./routes/admin.js")

app.use(cors())
app.use(express.json())
app.use("/user", userRouter)
// app.use("/admin", adminRouter)

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
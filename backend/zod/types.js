const z = require("zod")

const userSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string()
})

module.exports = {
    userSchema
}

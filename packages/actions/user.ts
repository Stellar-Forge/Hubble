"use server"

import prisma from "@repo/prisma/client"
import bcrypt from "bcrypt";

export async function signup(username: string, email: string, password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        return JSON.stringify(user)
    } catch(e) {
        return false
    }
}
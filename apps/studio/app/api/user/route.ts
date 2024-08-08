import { NextResponse } from "next/server"
import prisma from "@hubble/prisma/client"
import bcrypt from "bcrypt"

export const GET = async () => {

    const hashedPassword = await bcrypt.hash("qwe", 10) 
    try {
        const user = await prisma.user.create({
            data: {
                username: "abcd",
                email: "abcd@gmail.com",
                password: hashedPassword
            }
        })
        return NextResponse.json({
            message: "User created successfully",
            user
        })
    } catch (error) {
        console.error("Error creating user:", error)
        return NextResponse.json({
            message: "Error creating user",
            error: (error as Error).message
        }, { status: 500 })
    }
}
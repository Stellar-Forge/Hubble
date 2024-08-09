"use server"

import prisma from "@hubble/prisma/client"
import bcrypt from "bcrypt";
import { signupSchema } from "@hubble/zod-schema/signupSchema"

interface SignupParams {
    username: string,
    email: string,
    password: string
}

function inputValidation({username, email, password} : SignupParams ) {
    const res = signupSchema.safeParse({username, email, password})
    return res.success
}

export async function signup({username, email, password} : SignupParams) {

    const res = inputValidation({username, email, password})
    if (!res) {
        return {
            msg: "Wrong Inputs",
            success: false
        }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                workspaces: {
                    create: [
                        {workspaceId: 1, name: "Workspace 1"},
                        {workspaceId: 2, name: "Workspace 2"},
                        {workspaceId: 3, name: "Workspace 3"}
                    ]
                }
            }
        })
        return {
            msg: "Congrats! You're Signed Up. Please Login To Enter The App",
            success: true
        }
    } catch(e) {
        return {
            msg: "User Already Exists",
            success: false
        }
    }
}
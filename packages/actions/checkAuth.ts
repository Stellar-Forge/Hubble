"use server"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../../apps/studio/app/lib/auth"

export async function checkAuth() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/api/auth/signin")
    }
    return session
}
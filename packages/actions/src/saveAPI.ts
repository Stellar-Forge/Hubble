"use server"

import { API_Platform } from "@prisma/client";
import prisma from "@hubble/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/studio/app/lib/auth"

export async function saveAPIKey(encryptedApiKey: any, platform: string) {
    const session = await getServerSession(authOptions)
    const userId = Number(session.user.id)
    try {
        const response = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                API_Keys: {
                    create: [
                        {
                            platform: (platform === "Gemini") ? API_Platform.Google : API_Platform.GetImgAI, 
                            API_Key: encryptedApiKey
                        }
                    ]
                }
            }
        })

        return response

    } catch (e) {
        return false
    }
}
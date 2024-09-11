"use server";

import { API_Platform } from "@prisma/client";
import prisma from "@hubble/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/studio/app/lib/auth";

// Define the API_Platform enum locally
// enum API_Platform {
//     Google = "Google",
//     OpenAI = "OpenAI",
//     GetImgAI = "GetImgAI"
// }

type IncomingPlatform = "Gemini" | "GetImgAI";

function mapPlatform(platform: IncomingPlatform): API_Platform {
    if (platform === "Gemini") return API_Platform.Google;
    return API_Platform.GetImgAI;
}

export async function saveAPIKey(
    encryptedApiKey: string,
    platform: IncomingPlatform,
) {
    const session = await getServerSession(authOptions);
    const userId = Number(session.user.id);
    try {
        const apiPlatform = mapPlatform(platform);
        const response = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                API_Keys: {
                    create: [
                        {
                            platform: apiPlatform,
                            API_Key: encryptedApiKey,
                        },
                    ],
                },
            },
        });

        return response;
    } catch (e) {
        console.error("Error saving API key:", e);
        return false;
    }
}

function mapPlatformToEnum(platform: string) {
    if (platform === "Google") return API_Platform.Google;
    else return API_Platform.GetImgAI;
}

export async function deleteAPIKey(platform: any) {
    const session = await getServerSession(authOptions);
    const userId = Number(session.user.id);
    const apiPlatform = mapPlatformToEnum(platform);

    try {
        const res = prisma.aPI_Key.delete({
            where: {
                userId_platform: {
                    userId,
                    platform: apiPlatform,
                },
            },
        });
        return res;
    } catch (e) {
        console.log("Error Occured: ", e);
        return false;
    }
}

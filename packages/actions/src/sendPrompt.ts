"use server";

import axios from "axios";
import prisma from "@hubble/prisma/client";
import { API_Platform } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/studio/app/lib/auth";
import { decryptApiKey } from "@hubble/crypto/encryptApiKey";

interface QueryParams {
    prompt: string;
    style: string;
    width: number;
    height: number;
    output_format: string;
    response_format: string;
}

export async function geminiTextPrompt(input: string) {
    try {
        const session = await getServerSession(authOptions);
        const userId = Number(session.user.id);
        console.log(`Use ID: ${userId}`);

        const encrypted_API_KEY = await prisma.aPI_Key.findFirst({
            where: {
                userId,
                platform: API_Platform.Google,
            },
            select: {
                API_Key: true,
            },
        });
        console.log(
            `encrypted_API_KEY: ${JSON.stringify(encrypted_API_KEY?.API_Key)}`,
        );
        if (!encrypted_API_KEY) return { success: false };
        const decrypted_API_KEY = decryptApiKey(encrypted_API_KEY.API_Key);
        console.log(`decrypted_API_KEY: ${JSON.stringify(decrypted_API_KEY)}`);

        const res = await axios({
            url: "http://localhost:3301/api/v1/gemini/prompt",
            method: "POST",
            data: {
                query: {
                    prompt: input,
                    API_KEY: decrypted_API_KEY,
                },
            },
        });
        console.log(res.data);

        return {
            response: res.data.response.promptResult,
            success: true,
        };
    } catch (e) {
        console.log(e);
    }
}

export async function getImgAIPrompt({
    prompt,
    style,
    width,
    height,
    output_format,
    response_format,
}: QueryParams) {
    try {
        const session = await getServerSession(authOptions);
        const userId = Number(session.user.id);
        console.log(`Use ID: ${userId}`);

        const encrypted_API_KEY = await prisma.aPI_Key.findFirst({
            where: {
                userId,
                platform: API_Platform.GetImgAI,
            },
            select: {
                API_Key: true,
            },
        });
        console.log(
            `encrypted_API_KEY: ${JSON.stringify(encrypted_API_KEY?.API_Key)}`,
        );
        if (!encrypted_API_KEY) return { success: false };
        const decrypted_API_KEY = decryptApiKey(encrypted_API_KEY.API_Key);
        console.log(`decrypted_API_KEY: ${JSON.stringify(decrypted_API_KEY)}`);

        const res = await axios({
            url: "http://localhost:3301/api/v1/getimgai/prompt",
            method: "POST",
            data: {
                query: {
                    prompt,
                    style,
                    width,
                    height,
                    output_format,
                    response_format,
                    API_KEY: decrypted_API_KEY,
                },
            },
        });
        console.log(res.data);

        return {
            response: res.data.response,
            success: true,
        };
    } catch (e) {
        console.log(e);
    }
}

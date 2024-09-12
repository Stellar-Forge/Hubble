"use server";

import prisma from "@hubble/prisma/client";
import { API_Platform } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/studio/app/lib/auth";
import { decryptApiKey } from "@hubble/crypto/crypto";
import axios from "axios";

export async function checkAddedKeys() {
    const session = await getServerSession(authOptions);
    const userId = Number(session.user.id);
    try {
        const res = await prisma.aPI_Key.findMany({
            where: {
                userId,
            },
            select: {
                platform: true,
                API_Key: true,
            },
        });

        res.forEach((e) => {
            const decrypted_API_KEY = decryptApiKey(e.API_Key);
            e.API_Key = decrypted_API_KEY;
        });

        return res;
    } catch (e) {
        console.log(`Error Occured: ${e}`);
        return [{ message: "Some Error Occured" }];
    }
}

export async function getModelsInfo(model: string) {
    const urlModel = model === "Gemini" ? "gemini" : "getimgai";

    const mapModelToEnum = (model: string): API_Platform =>
        model === "Gemini" ? API_Platform.Google : API_Platform.GetImgAI;

    const platform = mapModelToEnum(model);
    const userKeys = await checkAddedKeys();

    console.log(urlModel, platform, userKeys);

    try {
        for (const e of userKeys as any) {
            if (e.platform === platform) {
                const res = await axios({
                    url: `http://localhost:3301/api/v1/${urlModel}/check`,
                    method: "POST",
                    data: {
                        query: {
                            API_KEY: e.API_Key,
                        },
                    },
                });
                return res.data;
            }
        }
    } catch (e) {
        return {
            success: false,
            msg: "Fetching data from webhook failed!",
        };
    }
}

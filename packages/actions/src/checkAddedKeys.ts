"use server";

import prisma from "@hubble/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/studio/app/lib/auth";
import { decryptApiKey } from "@hubble/crypto/crypto";

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

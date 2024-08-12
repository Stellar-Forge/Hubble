"use server";

import prisma from "@hubble/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/studio/app/lib/auth";

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
            },
        });

        return res;
    } catch (e) {
        console.log(`Error Occured: ${e}`);
        return [{ message: "Some Error Occured" }];
    }
}

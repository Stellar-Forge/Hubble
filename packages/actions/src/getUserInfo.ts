"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../apps/studio/app/lib/auth";
import prisma from "@hubble/prisma/client";

export async function getUserInfo() {
    const session = await getServerSession(authOptions);
    const userId = Number(session.user.id);

    try {
        const res = await prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        return res;
    } catch (e) {
        console.log("Error Occured while fetching data from db");
    }
}

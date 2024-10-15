"use server";

import { client } from "..";

export async function storeMessage(
    chatId: string,
    userId: number,
    payload: string,
) {
    const messageData = JSON.stringify({ userId, chatId, payload });
    client.lPush(`chatId:${chatId}`, messageData);
}

"use server"

import prisma from "@hubble/prisma/client";

export async function saveResult(history: any, workspaceId: number, userId: number) {
    try {
        const response = await prisma.user.update({
            where: { 
              id: userId
            },
            data: {
              workspaces: {
                update: {
                  where: {
                    userId_workspaceId: {  // This targets the specific workspace
                      userId: userId,
                      workspaceId: workspaceId
                    }
                  },
                  data: {
                    histories: {
                      create: [
                        { 
                          responses: history,
                        }
                      ]
                    }
                  }
                }
              }
            },
            include: {
              workspaces: {
                where: {
                  workspaceId: workspaceId
                },
                include: {
                  histories: {
                    orderBy: {
                      createdAt: 'desc'
                    },
                    take: 1  // This will include only the most recently created history
                  }
                }
              }
            }
          });

        return response
    } catch (e) {
        console.log(`Error: ${e}`)
        return false
    }
}
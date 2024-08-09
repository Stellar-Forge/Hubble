import prisma from "@hubble/prisma/client"
import bcrypt from "bcrypt";

async function main() {
    const hashedPassword = await bcrypt.hash("123", 10)
        const dummyUser = await prisma.user.upsert({
            where: { username: "dummy" },
            update: {},
            create: {
                username: "dummy",
                email: "dummy@dummymail.com",
                password: hashedPassword,
                workspaces: {
                    create: [
                        {workspaceId: 1, name: "Workspace 1"},
                        {workspaceId: 2, name: "Workspace 2"},
                        {workspaceId: 3, name: "Workspace 3"}
                    ]
                }
            }
        })
        console.log("Dummy User Created Successfully! ", {dummyUser})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
-- CreateTable
CREATE TABLE "API_Key" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "API_Key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "API_Key_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "API_Key" ADD CONSTRAINT "API_Key_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

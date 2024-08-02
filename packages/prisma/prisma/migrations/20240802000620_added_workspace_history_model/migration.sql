-- CreateTable
CREATE TABLE "WorkspaceHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "history" TEXT NOT NULL,

    CONSTRAINT "WorkspaceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceHistory_userId_key" ON "WorkspaceHistory"("userId");

-- AddForeignKey
ALTER TABLE "WorkspaceHistory" ADD CONSTRAINT "WorkspaceHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[userId,platform]` on the table `API_Key` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `platform` on the `API_Key` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "API_Platform" AS ENUM ('Google', 'OpenAI', 'GetImgAI');

-- AlterTable
ALTER TABLE "API_Key" DROP COLUMN "platform",
ADD COLUMN     "platform" "API_Platform" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "API_Key_userId_platform_key" ON "API_Key"("userId", "platform");

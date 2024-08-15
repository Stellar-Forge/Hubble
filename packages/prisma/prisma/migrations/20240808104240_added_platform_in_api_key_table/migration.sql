/*
  Warnings:

  - Added the required column `platform` to the `API_Key` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "API_Key" ADD COLUMN     "platform" TEXT NOT NULL;

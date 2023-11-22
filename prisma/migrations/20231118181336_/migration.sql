/*
  Warnings:

  - You are about to alter the column `previousWorkplaceCount` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "previousWorkplaceCount" SET DATA TYPE INTEGER;

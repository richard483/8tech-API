/*
  Warnings:

  - You are about to drop the column `payoutStatus` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "payoutStatus";

-- DropEnum
DROP TYPE "PayoutStatus";

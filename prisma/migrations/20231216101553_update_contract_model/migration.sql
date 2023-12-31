/*
  Warnings:

  - You are about to drop the column `bankAccountName` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `bankAccountNumber` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "bankAccountName",
DROP COLUMN "bankAccountNumber",
DROP COLUMN "bankName",
ADD COLUMN     "paymentRequestId" TEXT;

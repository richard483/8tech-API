/*
  Warnings:

  - You are about to drop the column `paymentRate` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `paymentRequestId` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `payoutLinkId` on the `Contract` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "paymentRate",
DROP COLUMN "paymentRequestId",
DROP COLUMN "paymentStatus",
DROP COLUMN "payoutLinkId",
ADD COLUMN     "paymentId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "paymentRate" INTEGER NOT NULL,
    "paymentRequestId" TEXT,
    "paymentStatus" "PaymentStatus" DEFAULT 'PENDING',
    "payoutLinkId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

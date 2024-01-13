/*
  Warnings:

  - You are about to drop the column `paymentRate` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `paymentRate` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "paymentRate" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentRate";

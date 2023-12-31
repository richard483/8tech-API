/*
  Warnings:

  - You are about to alter the column `bankAccountNumber` on the `Contract` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `paymentRate` on the `Contract` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "bankAccountNumber" SET DATA TYPE INTEGER,
ALTER COLUMN "paymentRate" SET DATA TYPE INTEGER;

/*
  Warnings:

  - Added the required column `bankAccountName` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankAccountNumber` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentRate` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Bank" AS ENUM ('BCA', 'BNI', 'BRI', 'MANDIRI', 'CIMB', 'MAYBANK');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('PENDING', 'ONGOING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "bankAccountName" TEXT NOT NULL,
ADD COLUMN     "bankAccountNumber" BIGINT NOT NULL,
ADD COLUMN     "bankName" "Bank" NOT NULL,
ADD COLUMN     "paymentRate" BIGINT NOT NULL,
ADD COLUMN     "status" "ContractStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'VOIDED', 'FAILED', 'COMPLETED', 'EXPIRED');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "payoutLinkId" TEXT,
ADD COLUMN     "payoutStatus" "PayoutStatus";

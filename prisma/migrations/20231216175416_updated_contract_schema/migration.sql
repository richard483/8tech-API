-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- AlterEnum
ALTER TYPE "ContractStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "paymentStatus" "PaymentStatus";

-- DropEnum
DROP TYPE "Bank";

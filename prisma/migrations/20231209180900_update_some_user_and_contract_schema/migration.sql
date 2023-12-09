-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "bankAccountName" DROP NOT NULL,
ALTER COLUMN "bankAccountNumber" DROP NOT NULL,
ALTER COLUMN "bankName" DROP NOT NULL;

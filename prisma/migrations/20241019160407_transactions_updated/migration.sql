/*
  Warnings:

  - The required column `id` was added to the `Transactions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Transactions_email_key";

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id");

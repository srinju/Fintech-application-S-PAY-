/*
  Warnings:

  - A unique constraint covering the columns `[userId,accountId]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BankAccount_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_userId_accountId_key" ON "BankAccount"("userId", "accountId");

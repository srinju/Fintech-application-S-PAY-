/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accountId_key" ON "BankAccount"("accountId");

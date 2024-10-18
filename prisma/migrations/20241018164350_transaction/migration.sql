-- CreateTable
CREATE TABLE "Transactions" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "senderBankId" TEXT NOT NULL,
    "receiverBankId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_email_key" ON "Transactions"("email");

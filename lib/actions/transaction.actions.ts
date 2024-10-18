
"use server"

import { PrismaClient } from "@prisma/client";


const prisma  = new PrismaClient();

export const createTransaction = async (transaction : CreateTransactionProps) => {
    try {
        const newTransaction = await prisma.transactions.create({
            data : {
                channel : 'online',
                category : 'Transfer',
                ...transaction,
            }
        });
        return newTransaction; //parsestringigy????
    }catch(error) {
        console.error("error occured while creating transaction " , error);
    }
}

export const getTransactionsByBankId = async ( {bankId} : getTransactionsByBankIdProps) => {
    try { 
        const senderTransactions = await prisma.transactions.findMany({
            where : {
                senderBankId : bankId as string
            }
        });
        const receiverTransactions = await prisma.transactions.findMany({
            where : {
                receiverBankId : bankId as string
            }
        });
        const transactions = {
            total : senderTransactions.length + receiverTransactions.length,
            documents : [
                ...senderTransactions,
                ...receiverTransactions
            ],
        };
        return transactions;
    } catch(error) {
        console.error("error occured while getting transaction by bank Id " , error);
    }
}
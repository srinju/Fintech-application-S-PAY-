"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";



// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    if(!userId) {
      console.error("userId is undefined in getAccounts Function");
      return null;
    }
    // get banks from db
    console.log("userId in the getAccounts function at the beginning of the try block" , userId);
    const banks = await getBanks({ userId });

    if (!banks || banks.length === 0) {
      console.log("No banks found for user", userId);
      return null;
    }

    const accounts = await Promise.all(
      banks.map(async (bank: Bank) => {
        // get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        console.log("access token ", bank.accessToken);
        const accountData = accountsResponse.data.accounts[0];

        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.id,
          shareableId: bank.shareableId,
        };

        return account;
      })
    );

    //calculate total marks and total current balance>

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account)  => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error("erorr in getAccounts function", error);
  }
};

// Get one bank account
export const getAccount = async ({ bankId }: getAccountProps) => {
  try {
    // get bank from db
    if (!bankId) {
      console.error("bankId is undefined in getAccount function");
      return null;
    }
    const session = await getServerSession(NEXT_AUTH);
    const userId = session?.user.id
    if(!userId) {
        return "user not authenticated!"
    }
    console.log("bank Id" , bankId);
    const bank = await getBank({ bankId });
    console.log("fetched bank (in the get account func og the bank actions file) ", bank);

    if(!bank) {
      console.log("bank not found");
      return null;
    };

    // fetching accountinfo from plaid using access token >
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });

    if (!accountsResponse.data.accounts || accountsResponse.data.accounts.length === 0) {
      console.error("No accounts found for the given access token");
      return null;
    }

    const accountData = accountsResponse.data?.accounts?.[0];

    if(!accountData) {
      console.error("No accounts found for the given bank!!!!");
      return null;
    }

    // get transfer transactions from appwrite
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.id,
    });

    const transferTransactions = transferTransactionsData?.documents.map(
      (transferData: any) => ({
        id: transferData.id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.id ? "debit" : "credit",
      })
    ) || [];

    console.log("transfer transaction right after the transferTransaction ",transferTransactions);

    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });

    console.log("trnasactions right after the transactions ",transactions);

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      bankId: bank?.id,
    };

    // sort transactions by date such that the most recent transaction is first
    const allTransactions = [...(transactions || []), ...(transferTransactions || [])].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      data : account,
      transactions : allTransactions
    }
  } catch (error) {
    console.error("An error occurred in the getACCOunt function :", error);
    return null;
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred in the getInstitution function :", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
        options : {
          include_personal_finance_category : true
        },
      });

      const data = response.data;

      transactions = [...transactions, ...response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
    }))];

      /*
      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));
      */
      

      /*
      transactions = transactions.concat(
        data.added.map((transaction) => ({
          id: transaction.transaction_id,
          name: transaction.name,
          paymentChannel: transaction.payment_channel,
          accountId: transaction.account_id,
          amount: transaction.amount,
          pending: transaction.pending,
          category: transaction.category ? transaction.category[0] : "",
          date: transaction.date,
        }))
      );
      */

      hasMore = response.data.has_more;
    }

    return transactions || [];
  } catch (error) {
    console.error("an error occured in the get transactions function :", error);
    return []; //returning empty array instead of undefined 
  }
};

// Create Transfer
export const createTransfer = async () => {
  const transferAuthRequest: TransferAuthorizationCreateRequest = {
    access_token: "access-sandbox-cddd20c1-5ba8-4193-89f9-3a0b91034c25",
    account_id: "Zl8GWV1jqdTgjoKnxQn1HBxxVBanm5FxZpnQk",
    funding_account_id: "442d857f-fe69-4de2-a550-0c19dc4af467",
    type: "credit" as TransferType,
    network: "ach" as TransferNetwork,
    amount: "10.00",
    ach_class: "ppd" as ACHClass,
    user: {
      legal_name: "Anne Charleston",
    },
  };
  try {
    const transferAuthResponse =
      await plaidClient.transferAuthorizationCreate(transferAuthRequest);
    const authorizationId = transferAuthResponse.data.authorization.id;

    const transferCreateRequest: TransferCreateRequest = {
      access_token: "access-sandbox-cddd20c1-5ba8-4193-89f9-3a0b91034c25",
      account_id: "Zl8GWV1jqdTgjoKnxQn1HBxxVBanm5FxZpnQk",
      description: "payment",
      authorization_id: authorizationId,
    };

    const responseCreateResponse = await plaidClient.transferCreate(
      transferCreateRequest
    );

    const transfer = responseCreateResponse.data.transfer;
    return parseStringify(transfer);
  } catch (error) {
    console.error(
      "An error occurred while creating transfer authorization:",
      error
    );
  }
};
"use server"
//user action for the create link token for the plaid

import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { encryptId, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { addFundingSource } from "./dwolla.actions";
import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

export const createLinkToken = async (user : User) => { //this is the thing where our server sends the user related information to the plaid server to get the linktoken
    try {
        const tokenParams = {
            user : {
                client_user_id : user.$id
            },
            client_name : `${user.firstName} ${user.lastName}`,
            products : ['auth'] as Products[],
            language : 'en',
            country_codes : ['US'] as CountryCode[],
        }
        const response = await plaidClient.linkTokenCreate(tokenParams); //in the response we are getting the link that will be created from plaid which plaid creates based on the user related information
        return parseStringify({
            linkToken : response.data.link_token
        })
    } catch (error) {
        console.error("an error occured while creating link token! " , error);
    }
}

//create bank account server action >

export const createBankAccount = async ({
    userId  ,
    bankId  ,
    accountId  ,
    accessToken  ,
    fundingSourceUrl  ,
    shareableId  ,
} : createBankAccountProps) => {

    try {
        const bankAccount = await primsa.bankAccount.create({
            data : {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId
            }
        })
        return bankAccount;
    } catch(error) {
        console.error("some error occured while creating bank account! " , error);
        throw new Error('Could not create Bank account')
    }

}

//this is the 5th and 6th wala step of plaid that is send the public token to the plaid and then get back a acess token , and with the access token we can do styff --> which comes later dwolla comes under the picture here
export const exchangePublicToken = async ({
    publicToken,
    user
} : exchangePublicTokenProps ) => {
    try { //echange public token for access token and itemId
        const response = await plaidClient.itemPublicTokenExchange({
            public_token : publicToken
        });

        //getting the access token and the item id from the response >
        const accessToken =  response.data.access_token;
        const itemId = response.data.item_id;

        //getting the account information from plaid using the access token>
        const accountsResponse = await plaidClient.accountsGet({
            access_token : accessToken
        });

        //getthing the account data >
        const accountData = accountsResponse.data.accounts[0];

        //with access token and account data we can create processor token for dwolla - its a payment processor

        //creating a processor token for dwolla using the aceess token and account id
        const request : ProcessorTokenCreateRequest = {
            access_token : accessToken,
            account_id : accountData.account_id,
            processor : "dwolla" as ProcessorTokenCreateRequestProcessorEnum
        }

        //generating the processor token>
        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        //we are using dwolla because it is easy to integrate but we could use it with paytm or razorpay or stripe or paypal
        //creating a funding source url for the account using the dowlla customer id processor token and bank name
        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId : user.dwollaCustomerId,
            processorToken,
            bankName : accountData.name,
        });

        //if the funding source url is not created then throw error>>
        if(!fundingSourceUrl){
            throw Error;
        }
        //and if fundingsource url exisis create a bank account 
        //using the userId , itemId, accountId, access token, funding source Url,
        //and sharable ID(this id is for users to transfer money between accounts)

        await createBankAccount({ //server action to create bank account
            userId : user.$id,
            bankId : itemId,
            accountId : accountData.account_id,
            accessToken,
            fundingSourceUrl,
            shareableId : encryptId(accountData.account_id),
        })

        //revalidatate the path to reflect the changes>
        //the revalidate path function from the next cache is nothing but cache the changes so that we can see the account we created>
        revalidatePath("/");
        return parseStringify({
            publicTokenExchange : "complete!",
        });

    } catch (error) {
        console.error("an error occured while exchanging the public token as access token" , error);
    }
}

"use server"

interface getaccountprops {
    userId : string
}

//get multiple bank accounts that belongs to a specific user>
export const getAccounts = async ({userId} : getaccountprops) => {
    //userid take
    //get banks of that user from db
    //get accounts within those banks for the user
}
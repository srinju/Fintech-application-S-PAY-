"use server"

import { HeaderBox } from "@/components/HeaderBox"
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { NEXT_AUTH } from "@/lib/auth";
import { formatAmount } from "@/lib/utils";
import { getServerSession } from "next-auth";

const TransactionHistory = async ({searchParams : {id,page}} : SearchParamProps) => {

    const currentPage = Number(page as string) || 1;
    const session = await getServerSession(NEXT_AUTH);
    if(!session || !session.user) return null;
    console.log(JSON.stringify(session));

    const accounts = await getAccounts({
        userId : session.user.id
    });

    if(!accounts) return;

    const accountsData = accounts?.data;
    const bankId = id || accountsData[0].id;
    //console.log("bank Id from the home page" , bankId);
    const account = await getAccount({bankId})

    //console.log("account data " , accountsData);
    //console.log("account " , account);

    const loggedIn = session?.user? {
        firstName : session.user.firstName || 'Guest',
        lastName : session.user.lastName || '',
        email : session.user.email || ''
    } : {
        firstName : 'Guest',
        lastName : '',
        email : ''
    }

    const rowsPerPage = 10;
    const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
    )   

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox 
                    title="Transaction History"
                    subtext="See your bank details and transactions"
                />
            </div>

            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">{account?.data.name}</h2> 
                        <p className="text-14 text-blue-25">
                            {account?.data.officialName}
                        </p>
                        <p className="font-medium tracking-more-wider">
                            {`●●●● ●●●● ●●●● ${account?.data.mask}`}
                        </p>
                    </div>
                    <div className='transactions-account-balance'>
                        <p className="text-14">Current balance</p>
                        <p className="text-24 text-center font-bold">{formatAmount(account?.data.currentBalance)}</p>
                    </div>
                </div>
                <section className="flex w-full flex-col gap-6">
                    <TransactionsTable 
                        transactions={currentTransactions}
                    />
                        {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                        )}
                </section>
            </div>
        </div>
    )
}

export default TransactionHistory

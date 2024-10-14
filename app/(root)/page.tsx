import { RightSideBar } from "@/components/RightSideBar";
import { HeaderBox } from "../../components/HeaderBox"
import { TotalBalanceBox } from "../../components/TotalBalanceBox"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";


async function Home({searchParams : {id,page}} : SearchParamProps)  {

    const currentPage = Number(page as string) || 1; //from the searchParams everything is got in form of string
    const session = await getServerSession(NEXT_AUTH);
    if(!session || !session.user) return null
    console.log(JSON.stringify(session));

    const accounts = await getAccounts({
        userId : session.user.id
    })

    if(!accounts) return;

    const accountsData = accounts?.data;
    const bankId = id || accountsData[0].id;
    //console.log("bank Id from the home page" , bankId);
    const account = await getAccount({bankId})

    //console.log("account data " , accountsData);
    //console.log("account " , account);
    
    const loggedIn = session?.user?  {
        firstName :session.user.firstName || 'Guest' ,
        lastName : session.user.lastName || '',
        email : session.user.email || ''
    } : {
        firstName : 'Guest',
        lastName : '',
        email : ''
    };

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox  type="greeting"
                        title = "Welcome"
                        user={loggedIn.firstName || 'Guest'}
                        subtext="Access and manage your account"
                    />
                    <TotalBalanceBox 
                        accounts={[accounts?.data]}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>
                <RecentTransactions accounts={accountsData}
                    transactions = {account?.transactions}
                    bankId={bankId}
                    page = {currentPage}
                />
            </div>
            <RightSideBar
                user = {loggedIn}
                transactions={account?.transactions}
                banks = {accountsData?.slice(0,2)}
            />
        </section>
    )
}

export default Home
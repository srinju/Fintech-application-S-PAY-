import { RightSideBar } from "@/components/RightSideBar";
import { HeaderBox } from "../../components/HeaderBox"
import { TotalBalanceBox } from "../../components/TotalBalanceBox"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";


async function Home()  {

    const session = await getServerSession(NEXT_AUTH);
    console.log(JSON.stringify(session));

    const loggedIn = session?.user?  {
        firstName :session.user.firstName || 'Guest' ,
        lastName : session.user.lastName || '',
        email : session.user.email || ''
    } : {
        firstName : 'Guest',
        lastName : '',
        emal : ''
    };

    const CurrentBalance = {
        Balance : 1250
    }

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
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={CurrentBalance.Balance}
                    />
                </header>
                recent transactions
            </div>
            <RightSideBar
                user = {loggedIn}
                transactions={[]}
                banks = {[{},{}]}
            />
        </section>
    )
}

export default Home
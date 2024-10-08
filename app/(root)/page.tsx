import { RightSideBar } from "@/components/RightSideBar";
import { HeaderBox } from "../../components/HeaderBox"
import { TotalBalanceBox } from "../../components/TotalBalanceBox"


const Home = () => {

    const loggedIn = {
        firstName : 'Srinjoy' ,
        lastName : "Das",
        email : "dassrinjoy333@gmail.com"
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
                        user={loggedIn?.firstName || 'Guest'}
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
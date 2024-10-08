import { HeaderBox } from "../components/HeaderBox"
import { TotalBalanceBox } from "../components/TotalBalanceBox"


const Home = () => {

    const loggedIn = {firstName : 'Srinjoy'};
    const CurrentBalance = {
        Balance : 1250
    }

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox  type="greeting"
                        title = "welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account"
                    />
                    <TotalBalanceBox 
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={CurrentBalance.Balance}
                    />
                </header>
            </div>
        </section>
    )
}

export default Home
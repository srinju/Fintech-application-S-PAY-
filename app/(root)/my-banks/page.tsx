"use server"

import { BankCard } from "@/components/BankCard";
import { HeaderBox } from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { NEXT_AUTH } from "@/lib/auth"
import { getServerSession } from "next-auth"

const MyBanks = async () => {

    const session = await getServerSession(NEXT_AUTH);
    if(!session) return null;
    
    const accounts = await getAccounts({
        userId : session?.user.id
    })

    if(!accounts) return;

    const loggedIn = session?.user? {
        id : session?.user.id,
        firstName : session.user.firstName || 'Guest',
        lastName : session.user.lastName || '',
        email : session.user.email || ''
    } : {
        firstName : 'Guest',
        lastName : '',
        email : ''
    }

    return (
        <section className='flex'>
            <div className="my-banks">
                <HeaderBox 
                title="My Bank Accounts"
                subtext="Effortlessly manage your banking activites."
                />

                <div className="space-y-4">
                <h2 className="header-2">
                    Your cards
                </h2>
                <div className="flex flex-wrap gap-6">
                    {accounts && accounts.data.map((a: Account) => (
                    <BankCard 
                        key={accounts.id}
                        account={a}
                        userName={loggedIn?.firstName}
                    />
                    ))}
                </div>
                </div>
            </div>
    </section>
    )
}

export default MyBanks
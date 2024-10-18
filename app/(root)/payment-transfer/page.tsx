"use server"

import { HeaderBox } from "@/components/HeaderBox"
import PaymentTransferForm from "@/components/PaymentTransferForm"
import { getAccounts } from "@/lib/actions/bank.actions"
import { NEXT_AUTH } from "@/lib/auth"
import { getServerSession } from "next-auth"

const Transfer = async () => {

    const session = await getServerSession(NEXT_AUTH);
    if(!session || !session.user) return null
    console.log(JSON.stringify(session));

    const accounts = await getAccounts({
        userId : session.user.id
    })
    if(!accounts) return;
    const accountsData = accounts?.data;
    return (
        <section className="payment-transfer">
            <HeaderBox
                title="Payment Transfer"
                subtext="Please Provide any details or notes related to the Payment Transfer."
            />
            <section>
                <PaymentTransferForm accounts={accountsData} />
            </section>
        </section>
    )
}

export default Transfer
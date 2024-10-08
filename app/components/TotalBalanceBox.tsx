"use client"

import qs from "query-string"
import CountUp from 'react-countup';
import { AnimatedCounter } from "./AnimatedCounter";
import { DoughnutChart } from "./DoughnutChart";

export declare type Account = {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialName: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    subtype: string;
    appwriteItemId: string;
    shareableId: string;
  };

export const TotalBalanceBox = ({accounts,totalBanks,totalCurrentBalance} : {
    accounts : Account[];
    totalBanks : number;
    totalCurrentBalance : number
}) => {

    //format amount 
    function formatAmount(amount : number) : string {
        const formatter = new Intl.NumberFormat("en-US",{
            style : "currency",
            currency : "USD",
            minimumFractionDigits : 2
        });
        return formatter.format(amount);
    }

    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                <DoughnutChart accounts={accounts} />
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    Bank Accounts : {totalBanks} 
                </h2>
                <div className="flex flex-col gap-2">
                    <p className="total-balance-label">
                        Total Current Balance
                    </p>
                    <div className="total-balance-amount flex-center gap-2">
                        <AnimatedCounter amount={totalCurrentBalance} />
                    </div>
                </div>
            </div>
        </section>
    )
}
"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Account } from "./TotalBalanceBox";

ChartJS.register(ArcElement, Tooltip, Legend);

declare interface DoughnutChartProps {
    accounts: Account[];
}

export const DoughnutChart =  ({ accounts }: DoughnutChartProps) => {

    const flatAccounts = accounts.flat(); //  by mistake accounts is made one array deep so flat removes the one array deep thing


    console.log("accounts before passing the to doughnut chart ", flatAccounts);
    const accountNames = flatAccounts.map((a) => a.name);
    const balances = flatAccounts.map((a) => a.currentBalance);
    console.log("accountNames from doughnut chart filr ", accountNames);
    console.log("balances from doughnut chart filr ", balances);

    // dataset for the chart data>
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: balances,
                backgroundColor: ["#7CFC00", "#50C878", "#008000"],
            },
        ],
        labels: accountNames,
    };

    return <Doughnut 
        data={data}
        options={{
            cutout: '60%',
            plugins : {
                legend : {
                    display : false
                }
            }
        }} 
    
    />;
};

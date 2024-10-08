"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Account } from "./TotalBalanceBox";

ChartJS.register(ArcElement, Tooltip, Legend);

declare interface DoughnutChartProps {
    accounts: Account[];
}

export const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    // dataset for the chart data>
    const data = {
        datasets: [
            {
                label: "Banks",
                data: [1250, 2500, 3750],
                backgroundColor: ["#7CFC00", "#50C878", "#008000"],
            },
        ],
        labels: ["Bank1", "Bank2", "Bank3"],
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

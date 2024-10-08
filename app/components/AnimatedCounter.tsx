"use client"

import CountUp from "react-countup"


export const AnimatedCounter = ({amount} : {
    amount : number
}) => {
    return (
        <div className="w-full">
            <CountUp  
                decimal=","
                duration={1}
                prefix="$"
                end={amount}/>
        </div>
    )
}
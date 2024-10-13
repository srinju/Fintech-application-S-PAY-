"use client"

import {  ClassValue, clsx } from "clsx";
import Link from "next/link"
import Image  from "next/image"
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { LogOutButton } from "./LogOutButton";
import { Footer } from "./Footer";
import PlaidLink from './PlaidLink'

export const sidebarLinks = [
    {
        imageURL : "https://img.icons8.com/?size=256&id=83326&format=png",
        route : "/",
        label : "Home"
    },
    {
        imageURL : "https://www.svgrepo.com/show/332324/dollar-circle.svg",
        route : "/my-banks",
        label : "My Banks"
    },
    {
        imageURL : "https://cdn-icons-png.flaticon.com/512/8231/8231679.png",
        route : "/transaction-history",
        label : "Transaction History"
    },
    {
        imageURL : "https://cdn-icons-png.flaticon.com/512/3846/3846974.png",
        route : "/payment-transfer",
        label : "Transfer Funds"
    }
]


export const SideBar = ({user} : SiderbarProps) => {

    const pathname = usePathname(); //gets the current pathname

    

    //property to make the button glow for the specific page the user is in 
    function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }

    return (
        <div className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link href={'/'} className="flex mb-5 text-slate-950 cursor-pointer  items-center gap-2">
                    <Image
                        src={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201080%201080%22%3E%3Cpath%20d%3D%22M568.4%20571.9c-2.3%203.5-5.6%206.3-9.9%208.4-4.3%202.1-9.3%203.3-14.9%203.6v8.7c0%201.1-.3%201.9-1%202.6-.7.7-1.6%201-2.8%201-1.1%200-1.9-.3-2.6-1-.7-.7-1-1.6-1-2.7v-8.7c-8.8-.6-17.1-2.5-24.8-5.8-1-.4-1.8-1.1-2.5-2-.7-.9-1-1.9-1-3%200-1.4.5-2.6%201.4-3.6.9-1%202.1-1.5%203.6-1.5.8%200%201.6.2%202.3.5%206.6%202.9%2013.6%204.6%2020.9%204.9v-28.2c-5.6-1.5-10.2-3.1-14-4.8-3.8-1.7-7-4.2-9.5-7.3-2.5-3.1-3.8-7.1-3.8-12%200-4.2%201-8.2%203.1-11.8%202.1-3.6%205.2-6.6%209.3-9%204.1-2.4%209.1-3.8%2014.9-4.3v-8.6c0-1.1.3-2%201-2.7.7-.7%201.6-1.1%202.6-1.1%201.1%200%202%20.4%202.7%201.1.7.7%201.1%201.6%201.1%202.7v8.5c8%20.3%2015.1%201.7%2021.4%204%202.3.8%203.4%202.5%203.4%204.9%200%201.3-.4%202.5-1.3%203.6s-2.1%201.6-3.6%201.6c-.5%200-1.1-.2-2-.5-5.6-2-11.5-3.1-17.9-3.3v29.2c5.9%201.4%2010.8%202.9%2014.7%204.5%203.9%201.6%207.1%204.1%209.8%207.3%202.6%203.2%203.9%207.5%203.9%2012.8%200%204.6-1.1%208.5-3.5%2012zM524%20528.6c2.7%202%206.8%203.6%2012.1%205v-27c-4.9.7-8.8%202.1-11.8%204.5-2.9%202.3-4.4%205.4-4.4%209.1%200%203.6%201.4%206.4%204.1%208.4zm36.9%2030.8c0-3.2-1.4-5.7-4.4-7.4-2.9-1.8-7.2-3.4-13-5v26.4c11.6-.8%2017.4-5.5%2017.4-14z%22%2F%3E%3Cpath%20d%3D%22M539.8%20598.4c-1.6%200-3-.5-4.1-1.5-1.1-1.1-1.7-2.5-1.7-4.2v-6.8c-8.3-.7-16.2-2.7-23.5-5.8-1.3-.5-2.5-1.5-3.4-2.7-.9-1.3-1.4-2.7-1.4-4.2%200-1.9.7-3.6%202-5%202-2.2%205.5-2.8%208.3-1.5%205.7%202.5%2011.7%204.1%2017.9%204.6v-24.4c-5-1.4-9.3-2.9-12.8-4.5-4.1-1.8-7.6-4.5-10.3-7.9-2.8-3.5-4.3-8-4.3-13.3%200-4.6%201.1-8.9%203.4-12.8%202.3-3.9%205.7-7.2%2010.1-9.7%203.9-2.3%208.6-3.7%2013.9-4.4v-6.7c0-1.6.6-3%201.6-4.1%202.1-2.3%206.1-2.3%208.3%200%201.1%201.1%201.7%202.5%201.7%204.2v6.5c7.4.5%2014.1%201.8%2020%204.1%203.1%201.1%204.8%203.5%204.8%206.9%200%201.8-.6%203.5-1.8%204.9-1.3%201.5-3.1%202.3-5.2%202.3-.8%200-1.7-.2-2.7-.6-4.6-1.6-9.7-2.7-15.1-3v25.4c5.3%201.3%209.8%202.7%2013.4%204.3%204.2%201.8%207.8%204.4%2010.6%207.9%202.9%203.6%204.4%208.3%204.4%2014.1%200%204.7-1.3%209.1-3.8%2012.9-2.5%203.8-6.2%206.9-10.8%209.1-4%201.9-8.6%203.2-13.7%203.7v6.8c0%201.6-.6%203-1.7%204.1-1%20.7-2.4%201.3-4.1%201.3zm-26.9-28.3c-.9%200-1.5.3-2.1.9-.6.6-.9%201.3-.9%202.2%200%20.7.2%201.2.6%201.8.4.6.9%201%201.5%201.3%207.4%203.2%2015.6%205.1%2024.1%205.6%201.1.1%201.9%201%201.9%202.1v8.7c0%20.8.3%201.1.4%201.2.2.2.5.4%201.2.4.8%200%201.1-.2%201.3-.4.2-.2.4-.5.4-1.2V584c0-1.1.9-2%202-2.1%205.3-.3%2010.1-1.5%2014.1-3.4%203.9-1.9%207-4.5%209.1-7.7%202.1-3.2%203.1-6.7%203.1-10.6%200-4.8-1.2-8.7-3.5-11.5-2.4-2.9-5.4-5.2-8.9-6.7-3.8-1.6-8.6-3.1-14.3-4.4-.9-.2-1.6-1.1-1.6-2v-29.2c0-.6.2-1.1.6-1.5.4-.4%201-.6%201.5-.6%206.6.3%2012.8%201.4%2018.5%203.4.9.4%201.2.4%201.3.4.9%200%201.5-.3%202-.9.6-.7.8-1.4.8-2.2%200-1.6-.6-2.4-2.1-2.9-6-2.3-13-3.6-20.7-3.9-1.1%200-2-1-2-2.1v-8.5c0-.5-.1-.9-.5-1.2-.7-.7-1.8-.7-2.4%200-.3.3-.5.7-.5%201.3v8.6c0%201.1-.8%202-1.9%202.1-5.5.5-10.2%201.8-14%204-3.8%202.2-6.7%204.9-8.6%208.2-1.9%203.3-2.8%206.9-2.8%2010.7%200%204.4%201.1%207.9%203.3%2010.7%202.3%202.9%205.2%205.1%208.7%206.7%203.7%201.7%208.3%203.2%2013.7%204.7.9.2%201.5%201.1%201.5%202v28.2c0%20.6-.2%201.1-.6%201.5-.4.4-1%20.6-1.5.6-7.5-.3-14.8-2-21.6-5.1-.1-.4-.6-.5-1.1-.5zm55.5%201.8zm-24.8%203.6c-.5%200-1-.2-1.4-.6-.4-.4-.7-.9-.7-1.5V547c0-.6.3-1.3.8-1.7.5-.4%201.2-.5%201.8-.4%206%201.6%2010.4%203.3%2013.5%205.2%203.5%202.1%205.4%205.3%205.4%209.2%200%206.7-3.3%2014.9-19.2%2016.1-.1.1-.2.1-.2.1zm2.1-25.7v21.3c11.7-1.5%2013.1-7.3%2013.1-11.7%200-2.5-1.1-4.3-3.4-5.6-2.2-1.4-5.5-2.8-9.7-4zm-9.6-14.1c-.2%200-.3%200-.5-.1-5.6-1.5-9.8-3.2-12.8-5.4-3.3-2.4-5-5.7-5-10%200-4.4%201.7-8%205.2-10.8%203.2-2.6%207.5-4.2%2012.8-4.9.6-.1%201.2.1%201.7.5.4.4.7%201%20.7%201.6v27c0%20.6-.3%201.3-.8%201.6-.4.4-.9.5-1.3.5zm-2.1-26.6c-3.4.7-6.2%201.9-8.4%203.6-2.4%201.9-3.6%204.4-3.6%207.5%200%202.9%201.1%205.1%203.2%206.6s5%202.8%208.8%204v-21.7zm-216.2-66.3H305c-11%200-19.9-8.9-19.9-19.9v-46.2c0-1.8-1.4-3.2-3.3-3.2h-71c-4.6%200-8.3-3.7-8.3-8.3s3.7-8.3%208.3-8.3h71c11%200%2019.9%208.9%2019.9%2019.9V423c0%201.8%201.4%203.3%203.2%203.3h12.8c4.6%200%208.3%203.7%208.3%208.3s-3.6%208.2-8.2%208.2z%22%2F%3E%3Cpath%20d%3D%22M179.6%20404.7c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6%2039.6%2017.8%2039.6%2039.6c0%2021.9-17.8%2039.6-39.6%2039.6zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9%200-12.6-10.3-22.9-22.9-22.9zm102.3%20381h-71c-4.6%200-8.3-3.7-8.3-8.3s3.7-8.3%208.3-8.3h71c1.8%200%203.3-1.4%203.3-3.3v-46.2c0-11%208.9-19.9%2019.9-19.9h12.8c4.6%200%208.3%203.7%208.3%208.3s-3.7%208.3-8.3%208.3H305c-1.8%200-3.2%201.4-3.2%203.2v46.2c0%2011.1-9%2020-19.9%2020z%22%2F%3E%3Cpath%20d%3D%22M179.6%20754.5c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6%2039.6%2017.8%2039.6%2039.6-17.8%2039.6-39.6%2039.6zm0-62.6c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9%200-12.6-10.3-22.9-22.9-22.9zM179.6%20579.6c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6%2039.6%2017.8%2039.6%2039.6-17.8%2039.6-39.6%2039.6zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9s10.3%2022.9%2022.9%2022.9c12.6%200%2022.9-10.3%2022.9-22.9s-10.3-22.9-22.9-22.9z%22%2F%3E%3Cpath%20d%3D%22M294%20548.4h-83.2c-4.6%200-8.3-3.7-8.3-8.3s3.7-8.3%208.3-8.3H294c4.6%200%208.3%203.7%208.3%208.3s-3.7%208.3-8.3%208.3zM774.9%20442.8h-13c-4.6%200-8.3-3.7-8.3-8.3s3.7-8.3%208.3-8.3h13c1.8%200%203.3-1.4%203.3-3.3v-46.2c0-11%208.9-19.9%2019.9-19.9h71c4.6%200%208.3%203.7%208.3%208.3s-3.7%208.3-8.3%208.3h-71c-1.8%200-3.2%201.5-3.2%203.2v46.2c0%2011.1-9%2020-20%2020z%22%2F%3E%3Cpath%20d%3D%22M900.4%20404.7c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6%2039.6%2017.8%2039.6%2039.6c0%2021.9-17.8%2039.6-39.6%2039.6zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9%200-12.6-10.3-22.9-22.9-22.9zm-31.3%20381h-71c-11%200-19.9-8.9-19.9-19.9v-46.2c0-1.8-1.4-3.2-3.3-3.2h-13c-4.6%200-8.3-3.7-8.3-8.3s3.7-8.3%208.3-8.3h13c11%200%2019.9%208.9%2019.9%2019.9v46.2c0%201.8%201.5%203.3%203.2%203.3h71c4.6%200%208.3%203.7%208.3%208.3s-3.6%208.2-8.2%208.2z%22%2F%3E%3Cpath%20d%3D%22M900.4%20754.5c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6S940%20693%20940%20714.9c0%2021.8-17.8%2039.6-39.6%2039.6zm0-62.6c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9%200-12.6-10.3-22.9-22.9-22.9zM900.4%20579.6c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6S940%20518.2%20940%20540s-17.8%2039.6-39.6%2039.6zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9s10.3%2022.9%2022.9%2022.9c12.6%200%2022.9-10.3%2022.9-22.9s-10.3-22.9-22.9-22.9z%22%2F%3E%3Cpath%20d%3D%22M869.1%20548.4h-83.4c-4.6%200-8.3-3.7-8.3-8.3s3.7-8.3%208.3-8.3h83.4c4.6%200%208.3%203.7%208.3%208.3s-3.7%208.3-8.3%208.3zM645.5%20326.3c-4.6%200-8.3-3.7-8.3-8.3v-13c0-11%208.9-19.9%2019.9-19.9h46.2c1.8%200%203.2-1.5%203.2-3.3v-71c0-4.6%203.7-8.3%208.3-8.3%204.6%200%208.3%203.7%208.3%208.3v71c0%2011-8.9%2019.9-19.9%2019.9H657c-1.8%200-3.2%201.4-3.2%203.2V318c.1%204.6-3.7%208.3-8.3%208.3z%22%2F%3E%3Cpath%20d%3D%22M714.9%20219.2c-21.8%200-39.6-17.8-39.6-39.6S693%20140%20714.9%20140s39.6%2017.8%2039.6%2039.6-17.8%2039.6-39.6%2039.6zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9%200-12.6-10.3-22.9-22.9-22.9zM434.4%20326.2c-4.6%200-8.3-3.7-8.3-8.3V305c0-1.8-1.4-3.2-3.3-3.2h-46.2c-11%200-19.9-8.9-19.9-19.9v-71c0-4.6%203.7-8.3%208.3-8.3%204.6%200%208.3%203.7%208.3%208.3v71c0%201.8%201.5%203.3%203.2%203.3h46.2c11%200%2019.9%208.9%2019.9%2019.9v12.8c.2%204.6-3.5%208.3-8.2%208.3z%22%2F%3E%3Cpath%20d%3D%22M365.1%20219.2c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6%2039.6%2017.8%2039.6%2039.6-17.7%2039.6-39.6%2039.6zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9.1-12.6-10.2-22.9-22.9-22.9zM540%20219.2c-21.8%200-39.6-17.8-39.6-39.6S518.2%20140%20540%20140s39.6%2017.8%2039.6%2039.6-17.8%2039.6-39.6%2039.6zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9%200-12.6-10.3-22.9-22.9-22.9z%22%2F%3E%3Cpath%20d%3D%22M539.9%20302.5c-4.6%200-8.3-3.7-8.3-8.3v-83.3c0-4.6%203.7-8.3%208.3-8.3%204.6%200%208.3%203.7%208.3%208.3v83.3c.1%204.5-3.7%208.3-8.3%208.3zM714.9%20877.5c-4.6%200-8.3-3.7-8.3-8.3v-71c0-1.8-1.4-3.3-3.2-3.3h-46.2c-11%200-19.9-8.9-19.9-19.9v-13c0-4.6%203.7-8.3%208.3-8.3%204.6%200%208.3%203.7%208.3%208.3v13c0%201.8%201.4%203.3%203.2%203.3h46.2c11%200%2019.9%208.9%2019.9%2019.9v71c0%204.5-3.7%208.3-8.3%208.3z%22%2F%3E%3Cpath%20d%3D%22M714.9%20940c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6%2039.6%2017.8%2039.6%2039.6-17.8%2039.6-39.6%2039.6zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9%200-12.6-10.3-22.9-22.9-22.9zm-349.8%200c-4.6%200-8.3-3.7-8.3-8.3v-71c0-11%208.9-19.9%2019.9-19.9h46.2c1.8%200%203.3-1.4%203.3-3.3v-13c0-4.6%203.7-8.3%208.3-8.3%204.6%200%208.3%203.7%208.3%208.3v13c0%2011-8.9%2019.9-19.9%2019.9h-46.2c-1.8%200-3.2%201.4-3.2%203.3v71c-.1%204.5-3.8%208.3-8.4%208.3z%22%2F%3E%3Cpath%20d%3D%22M539.9%20794.1c-38.3%200-75-8.3-109.1-24.6-52.8-25-95.6-67.7-120.6-120.4C294%20615%20285.7%20578.3%20285.7%20540c0-38.2%208.3-75%2024.6-109.2%2025.1-52.8%2067.9-95.6%20120.6-120.5%2034.1-16.3%2070.8-24.5%20109-24.5s74.9%208.3%20109.3%2024.6c52.5%2025%2095.3%2067.8%20120.4%20120.4%2016.2%2034.3%2024.4%2071%2024.4%20109.2%200%2038.3-8.3%2075-24.6%20109.1-25.1%2052.7-67.8%2095.4-120.4%20120.3-34.2%2016.4-70.9%2024.7-109.1%2024.7zm0-491.6c-35.8%200-70.1%207.7-101.9%2022.9-49.3%2023.3-89.3%2063.3-112.7%20112.6-15.2%2032-22.9%2066.3-22.9%20102%200%2035.8%207.7%2070.1%2022.9%20101.9%2023.4%2049.3%2063.4%2089.2%20112.7%20112.6%2031.9%2015.2%2066.1%2022.9%20101.8%2022.9s70-7.7%20102.1-23c49.1-23.3%2089-63.2%20112.5-112.5%2015.2-31.9%2022.9-66.1%2022.9-101.9%200-35.7-7.7-70.1-22.9-102C731%20388.8%20691%20348.9%20642%20325.5c-32.1-15.3-66.4-23-102.1-23zM365.1%20940c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6%2039.6%2017.8%2039.6%2039.6S387%20940%20365.1%20940zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9.1-12.6-10.2-22.9-22.9-22.9zM540%20940c-21.8%200-39.6-17.8-39.6-39.6s17.8-39.6%2039.6-39.6%2039.6%2017.8%2039.6%2039.6S561.8%20940%20540%20940zm0-62.5c-12.6%200-22.9%2010.3-22.9%2022.9%200%2012.6%2010.3%2022.9%2022.9%2022.9%2012.6%200%2022.9-10.3%2022.9-22.9%200-12.6-10.3-22.9-22.9-22.9z%22%2F%3E%3Cpath%20d%3D%22M539.9%20877.5c-4.6%200-8.3-3.7-8.3-8.3v-83.3c0-4.6%203.7-8.3%208.3-8.3%204.6%200%208.3%203.7%208.3%208.3v83.3c.1%204.5-3.7%208.3-8.3%208.3zM540.1%20648.4c-31.7%200-61.8-13.8-82.4-37.9-16.8-19.5-26-44.5-26-70.5%200-59.8%2048.6-108.4%20108.4-108.4%2059.7%200%20108.3%2048.6%20108.3%20108.4%200%2025.5-9%2050.3-25.4%2069.9-20.8%2024.5-51%2038.5-82.9%2038.5zm0-200.1c-50.6%200-91.7%2041.2-91.7%2091.7%200%2022%207.8%2043.1%2022%2059.6%2017.5%2020.4%2042.9%2032.1%2069.8%2032.1%2027%200%2052.6-11.9%2070.1-32.6%2013.9-16.5%2021.5-37.5%2021.5-59.1-.1-50.6-41.2-91.7-91.7-91.7z%22%2F%3E%3Cpath%20d%3D%22M554.2%20746.7h-28.3c-14%200-25.7-10-28-23.8l-4.3-28.3c-10.3-3-20.4-7.3-30.2-12.6l-23%2017c-11.4%208.3-26.8%207.1-36.7-2.9l-19.8-19.8c-10-10.2-11.1-25.6-2.7-36.8l16.9-23c-2.1-3.8-3.9-7.5-5.6-11.2-2.8-6-5.1-12.4-6.9-18.9l-28.3-4.3c-14-2.3-24-14-24-28v-28.2c0-14.1%2010.1-25.9%2024.1-28l28.2-4.4c3.1-10.4%207.2-20.5%2012.4-30l-17-23.1c-8.2-11.4-7-26.7%202.9-36.6l19.8-20c10-10%2025.4-11.1%2036.8-2.8l22.9%2016.8c9.5-5.2%2019.6-9.4%2030.1-12.5l4.3-28.1c2.3-13.9%2014-24%2028-24h28.3c14%200%2025.7%2010.1%2027.9%2023.9l4.3%2028.1c10.5%203.2%2020.6%207.4%2030.1%2012.5l22.9-16.8c11.3-8.3%2026.8-7.2%2036.8%202.7l20%2020c9.8%209.9%2010.9%2025.3%202.7%2036.6L682%20463.3c5.1%209.4%209.2%2019.4%2012.4%2030l28.4%204.4c13.8%202.1%2023.8%2013.8%2023.8%2028v28.2c0%2013.9-10%2025.7-23.7%2028l-28.5%204.3c-1.9%206.5-4.2%2012.8-6.9%2018.9-1.7%203.8-3.5%207.5-5.6%2011.2l17%2023c8.3%2011.4%207.1%2026.8-2.8%2036.7l-19.9%2019.8c-9.6%209.8-25.3%2011-36.6%202.9l-22.9-16.9c-9.8%205.3-19.9%209.5-30.2%2012.6l-4.3%2028.2c-2.3%2014.1-14%2024.1-28%2024.1zm-91.4-82.8c1.4%200%202.9.4%204.2%201.1%2011.7%206.8%2023.8%2011.9%2036.1%2015%203.2.8%205.7%203.5%206.2%206.8l5.1%2033.5c.9%205.6%205.8%209.7%2011.6%209.7h28.3c5.7%200%2010.5-4.1%2011.4-9.8l5.2-33.5c.5-3.3%202.9-6%206.2-6.8%2012.4-3.2%2024.5-8.2%2036.1-15%202.9-1.7%206.5-1.5%209.2.5l27.2%2020.1c4.6%203.3%2011%202.8%2014.9-1.2l20-19.9c4.1-4.1%204.5-10.4%201.1-15.1l-20.2-27.4c-2-2.7-2.2-6.4-.4-9.3%202.9-4.7%205.3-9.4%207.5-14.2%203.1-6.9%205.6-14.2%207.4-21.6.8-3.3%203.5-5.7%206.8-6.2l33.8-5.1c5.6-.9%209.7-5.8%209.7-11.5v-28.2c0-5.8-4.1-10.6-9.7-11.5l-33.7-5.2c-3.3-.5-5.9-2.9-6.8-6.1-3.4-12.9-8.4-25-14.9-35.9-1.7-2.9-1.5-6.5.4-9.1l20-27.5c3.4-4.7%202.9-11-1.1-15.1l-19.9-20c-4.1-4.1-10.5-4.5-15.2-1.1l-27.3%2020c-2.7%202-6.3%202.1-9.2.5-11.1-6.6-23.2-11.6-36-15-3.2-.9-5.6-3.5-6.1-6.8l-5.2-33.4c-.9-5.7-5.7-9.8-11.4-9.8h-28.3c-5.8%200-10.6%204.2-11.6%209.9l-5.1%2033.3c-.5%203.3-2.9%205.9-6.1%206.8-12.8%203.4-24.9%208.5-36%2015-2.9%201.7-6.5%201.5-9.2-.5l-27.3-20c-4.7-3.5-11.1-3-15.1%201.1l-19.8%2020c-4.1%204.1-4.6%2010.4-1.2%2015.1l20%2027.4c2%202.7%202.1%206.3.4%209.2-6.6%2011.1-11.6%2023.2-14.8%2035.8-.8%203.2-3.5%205.7-6.8%206.2l-33.6%205.2c-5.8.9-9.9%205.7-9.9%2011.5V554c0%205.7%204.2%2010.6%2010%2011.5l33.6%205.1c3.4.5%206.1%203%206.9%206.3%201.8%207.4%204.2%2014.6%207.4%2021.5%202.1%204.8%204.6%209.5%207.5%2014.4%201.7%202.9%201.5%206.5-.4%209.2l-20.1%2027.4c-3.4%204.6-2.9%2010.9%201.2%2015.1l19.8%2019.7c4%204%2010.5%204.6%2015%201.2l27.3-20c1.4-1%203.1-1.5%204.9-1.5z%22%2F%3E%3C%2Fsvg%3E"}
                        width={50}
                        height={50}
                        alt="company logo"
                    />
                    <h1 className="sidebar-logo">SPay</h1>
                </Link>
                {sidebarLinks.map((item) => {

                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}`)

                    return (
                        <Link 
                            className={cn('sidebar-link hover:bg-green-700 ',{'bg-green-400 ':isActive})} 
                            href={item.route} 
                            key={item.label} >
                            <div className="flex items-center gap-2 ">
                                <div>
                                    <Image 
                                        src={item.imageURL}
                                        width={30}
                                        height={30}
                                        unoptimized={true}
                                        alt="button logo"
                                    />
                                </div>
                                <div className="text-slate-950 font-bold hidden md:hidden lg:block">
                                    {item.label}
                                </div>
                            </div>
                        </Link>
                    )
                })}
                <PlaidLink user={user} />
                
            </nav>
            
            <Footer user={user} type="desktop" />
        </div>
    )
}

export default SideBar;
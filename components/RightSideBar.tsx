"use client"

import Image from "next/image"
import Link from "next/link"
import { BankCard } from "./BankCard"


export const RightSideBar = ({user,transactions,banks}: RightSidebarProps) => {

    return (
        <aside className="right-sidebar">
            <div className="flex flex-col ">
                <div className="profile-banner bg-green-400" />
                <div className="profile">
                    <div className="profile-img">
                        <span className="text-5xl font-bold text-green-600">{user.firstName[0]}</span>
                    </div>

                    <div className="profile-details">
                        <h1 className="profile-name">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="profile-email">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
            <div className="banks">
                <div className="flex w-full justify-between">
                    <h2 className="header-2">My Banks</h2>
                    <Link
                        href="/"
                        className="flex gap-2"
                    >
                        <Image
                            src="https://www.svgrepo.com/show/40113/plus.svg"
                            width={20}
                            height={20}
                            alt="plus"
                        />
                        <h2 className="text-14 font-semibold text-gray-600">
                            Add Bank
                        </h2>
                    </Link>
                </div>

                {banks?.length>0 && ( //if there is banks with that banks.length>0 k liye show the div below
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                        <div className="relative z-10">
                            <BankCard
                                key={banks[0].id}
                                account={banks[0]}
                                userName={`${user.firstName} ${user.lastName}`}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className="absolute right-10 top-8 z-0 w-[90%]">
                                <BankCard
                                    key={banks[1].id}
                                    account={banks[1]}
                                    userName={`${user.firstName} ${user.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}

            </div>
        </aside >
    )
}
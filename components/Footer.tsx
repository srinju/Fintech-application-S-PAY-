"use client"
import { LogOutButton } from "./LogOutButton"


export const Footer = ({user , type = 'desktop'} : FooterProps) => {
    return (
        <footer className="footer">
            <div className={type === 'mobile'?
                'footer_name-mobile' : 'footer_name'
            }>
                <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
            </div>

            <div className={type === 'mobile'?
                'footer_email-mobile' : 'footer_email'
            }>
                <h1 className="text-14 truncate font-normal text-gray-600">
                    {user.firstName}
                </h1>
                <p className="text-14 truncate  text-gray-700 ">
                    {user.email}
                </p>
            </div>
            <div className="text-slate-950">
                <LogOutButton />
            </div>
        </footer>
    )
}
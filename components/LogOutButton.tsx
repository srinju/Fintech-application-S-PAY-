"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const LogOutButton = () => {
   
    const router = useRouter();

    const handleLogOut = async () => {
        await signOut({redirect : false});
        router.push('/api/auth/signin');
    }

    return <div>
        <button onClick={handleLogOut}>LogOut</button>    
    </div>
}
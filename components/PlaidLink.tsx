"use client"
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { Button } from './ui/button';
import Image from 'next/image';

const PlaidLink = ({user,variant} : PlaidLinkProps) => {
    const router = useRouter();
    const [token , setToken] = useState('');

    //2 wala point happeneing where linktoken is get
    useEffect(() => { //on mount this will be called because when the account linking is stareted then the server requests the plaid for a linktoken
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        }
        getLinkToken();
    },[user]);

    //3rd wala step when the linktoken is get then public token is generated and it is send to the server and the server will send it to the client
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token : string) => {
        await exchangePublicToken({
            publicToken : public_token,
            user
        })
        router.push('/');
    },[user]) //when the user changes then the use callback is triggered

    const config : PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open , ready} = usePlaidLink(config);

  return (
    <>
        {variant === 'primary' ? (
            <Button onClick={() => open()}
             disabled={!ready} //means when user is not signed up or there is no session genereated then it will show disabled 
             type='button'
             className='plaidlink-primary'>
                Connect Bank
            </Button>
        ) : variant === 'ghost' ? (
            <Button onClick={() => {
                open()
            }} className='plaidlink-ghost'
                variant="ghost"
                type='button'>
                    <Image
                        src="	https://www.svgrepo.com/show/93921/satellite.svg"
                        alt="connect bank"
                        width={24}
                        height={24}
                    />
                    <p className=' hidden text-[16px] font-semibold text-black-2 xl:block'>
                        Connect Bank
                    </p>
            </Button>
        ) : (
            <Button onClick={() => {
                open()
            }} className='plaidlink-default'>
                <Image
                    src="	https://www.svgrepo.com/show/93921/satellite.svg"
                    alt="connect bank"
                    width={24}
                    height={24}
                />
                <p className='text-[16px] font-semibold text-black-2'>
                    Connect Bank
                </p>
            </Button>
        )}
    
    </>
  )
}

export default PlaidLink


import Signup from '@/components/SignUp'
import { NEXT_AUTH } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function signup()  {

  const session = await getServerSession(NEXT_AUTH);
  if(!session) return null;

  return <div>
    <Signup />
  </div>
}

export default signup
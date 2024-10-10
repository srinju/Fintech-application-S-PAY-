

import Signup from '@/components/SignUp'
import { NEXT_AUTH } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function signup()  {

  return <div>
    <Signup />
  </div>
}

export default signup
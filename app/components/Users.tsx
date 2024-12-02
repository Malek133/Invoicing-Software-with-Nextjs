import React from 'react'

import { currentUser } from '@clerk/nextjs/server'
const Users = async () => {
    const user = await currentUser()

    if (!user) return <div>Not signed in</div> 
  return (
    <main className='flex justify-end items-center mx-5 my-2'>
    <h1 className='text-xl' >
    <span className='text-2xl font-semibold'>User:</span> {user?.firstName}</h1> 
    
    </main>
  )
}

export default Users
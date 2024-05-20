import React from 'react'
import Image from 'next/image'
import myimg from "./taxilogo.png"
import { UserButton } from '@clerk/nextjs'
function navbar() {
  return (
        <div className='flex justify-between p-2 px-10 border-b-[1px] shadow-sm'>
            <div className='flex gap-10 items-center'>
            <Image src={myimg} alt="mylogo" style={{height:"60px",width:"60px"}}/>
            <div className='hidden md:flex gap-6'>
            <p className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>Home</p>
            <p className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>History</p>
            <p className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>Help</p>
        </div>
      {/* <h1>hi hello welcome to navbar</h1> */}
    </div>
    <UserButton afterSignOutUrl="/"/>
 </div>
  )
}

export default navbar

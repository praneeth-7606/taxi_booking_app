"use client"
import React, { useEffect, useState } from 'react';
import Cars from './cars';
import AutocompleteAddress from './AutocompleteAddress';
import Cards from './cards';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CarSelectedAmountContext } from '@/app/context/carselectedamountcontext';
function Booking() {
    const [screenHeight, setScreenHeight] = useState(0);
    const[amount,setamount]=useState()
    const {selectedAmount, setSelectedAmount} =useContext(CarSelectedAmountContext)
    const router:any=useRouter()
    useEffect(() => {
        // Check if window is defined (client-side)
        if (typeof window !== 'undefined') {
            setScreenHeight(window.innerHeight * 0.72);
        }
    }, []);

    return (
        <div className='p-5'>
            <h2 className='text-[20px] font-semibold'>Booking</h2>
            <div className='border-[1px] p-5 rounded-md' style={{ height: screenHeight }}>
                <AutocompleteAddress />
                <Cars/>
                <Cards/>
                {/* <button  className={'w-full bg-yellow-400 p-1 rounded-md mt-4 ${!selectedAmount?'bg-gray-200':null}'} onClick={()=>router.push('/payment')}>book</button> */}
                <button
          className={`w-full
         
        p-1 rounded-md
        mt-4 hover:text-white ${!selectedAmount ? "bg-gray-200" : "bg-yellow-400"}`}
          disabled={!selectedAmount}
          onClick={() => {
            router.push("/payment");
          }}
        >
          Book
        </button>
            </div>
        </div>
    );
}

export default Booking;

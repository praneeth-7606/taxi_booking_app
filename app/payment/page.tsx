"use client"
import React ,{useContext}from 'react'
import { CarSelectedAmountContext } from '../context/carselectedamountcontext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkoutform'
function payment() {
    // const {selectedAmount, setSelectedAmount}= useContext(CarSelectedAmountContext)
const  stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any)
const options:any={
    mode:"payment",
    amount:50,
    currency:'usd',
    appearance:{

    },

};
  return (
    <Elements  stripe={stripePromise} options={options}>
    <CheckoutForm/>
    </Elements>
  )
}

export default payment

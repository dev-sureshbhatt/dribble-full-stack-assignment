import React from 'react'
import Navbar from '../components/Navbar'
import HeadingHero from '../components/HeadingHero'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelopeCircleCheck} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'


const ThankYou = () => {

  
const userDetails = useSelector((state) => state.auth)
const userEmail = userDetails.user.email
  return (
    
    <div className='flex flex-col justify-between items-center mx-3 my-2'>
    <div className='flex flex-col justify-between items-center text-center sm:w-1/2'>

        <HeadingHero heading={"Please verify your email..."} subheading={""} />
        <FontAwesomeIcon className='text-[#EA4B8B] h-20 mb-4' icon={faEnvelopeCircleCheck} />        
        <p className='text-slate-500 font-semibold mb-4'>Please verify your email address. We've sent a confirmation email to</p>
        <p className='text-black font-bold mb-4'>{userEmail}</p>
        <p className='text-slate-500 font-semibold mb-4'>Click the confirmation link in that email to begin using Dribble</p>
        <p className='text-slate-500 font-semibold mb-4'>Didn't recieve the emai? Check your spam folder, it may have been caught by a filter. If you still don't see it, <span className='text-[#EA4B8B]'>you can resend the confirmation email.</span></p>
        <p className='text-slate-500 font-semibold mb-4'>Wrong email address? <span className='text-[#EA4B8B]'>Change it.</span></p>



    </div>
    </div>
  )
}

export default ThankYou
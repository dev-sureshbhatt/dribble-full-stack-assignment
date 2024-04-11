import React from 'react'
import Navbar from '../components/Navbar'
import HeadingHero from '../components/HeadingHero'
import SurveyItem from '../components/SurveyItem'

const ThankYou = () => {
  return (
    
    <div className='flex flex-col justify-between items-center'>
      <Navbar />
    <div className='flex flex-col justify-between items-center text-center'>

        <HeadingHero heading={"Please verify your email..."} subheading={""} />
        <p>Please verify your email address. We've sent a confirmation email to</p>
        <p>account@referrodesign.com</p>
        <p>Click the confirmation link in that email to begin using Dribble</p>
        <p>Didn't recieve the emai? Check your spam folder, it may have been caught by a filter. If you still don;t see it, you can resend the confirmation email.</p>
        <p>Wrong email address? Change it</p>



    </div>
    </div>
  )
}

export default ThankYou
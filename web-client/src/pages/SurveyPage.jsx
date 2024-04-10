import React from 'react'
import HeadingHero from '../components/HeadingHero'
import Navbar from '../components/Navbar'
import SurveyItem from '../components/SurveyItem'

const SurveyPage = () => {
  return ( 
    <div className='flex flex-col justify-between items-center'>
      <Navbar />
    <div className='flex flex-col justify-between items-center text-center gap-16'>

        <HeadingHero heading={"What brings you to Dribble?"} subheading={"Select the options that best describe you. Don't worry, you can explore other options later. "} />
        <div className='flex flex-wrap w-full  justify-center gap-10 items-center'>

<SurveyItem id={"box1"} imageURL={'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'} label={"I'm a designer looking to share my work"} />
<SurveyItem id={"box2"} imageURL={'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'} label={"I'm a designer looking to share my work"} />
<SurveyItem id={"box3"} imageURL={'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'} label={"I'm a designer looking to share my work"} />        
        

        </div>
        <button className='bg-[#EA4B8B] hover:bg-[#ea4b8ba3] text-white font-bold text-sm py-2 rounded-lg w-1/5'>Finish</button>
    </div>
    </div>
  )
}

export default SurveyPage
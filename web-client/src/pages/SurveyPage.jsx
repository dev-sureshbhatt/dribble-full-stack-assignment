import React from 'react'
import { useState } from 'react'
import HeadingHero from '../components/HeadingHero'
import Navbar from '../components/Navbar'
import SurveyItem from '../components/SurveyItem'
import {useNavigate} from 'react-router-dom'

const SurveyPage = () => {
  const [loading, setLoading] = useState(false)
  // const BASEURL = 'https://aeonaxy-full-stack-assignment.onrender.com'
  const BASEURL = 'https://aeonaxy-full-stack-assignment.onrender.com'
  const navigate = useNavigate()


  //We define initial form string here with values as false, changing heading, subheading, options here affects the form as form details are mapped via this state 
  const [surveyFormData, setSurveyFormData] = useState({
    heading: "What brings you to Dribble?",
    subheading: "Select the options that best describe you. Don't worry, you can explore other options later.",
    options: [
      { label: "I'm looking for design inspiration", checked: false },
      { label: "I'm looking to hire a designer", checked: false },
      { label: "I'm a designer looking to share my work", checked: false },
      // { label: "", checked: false } // We can add more labels if we want to add more questions to the form
    ]
  })

  function handleSubmit(){
    setLoading(false)
    const userDetails = {userSurveyDetails: {
      heading: surveyFormData.heading,
      subheading: surveyFormData.subheading,
      options: surveyFormData.options
    }}

    fetch(`${BASEURL}/api/users/details`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userDetails),
      credentials: 'include'
    })
    .then(
      (response) => {
        response.json()
                      .then((data)=>{
                        if (data.success == true){
                          navigate('/thank-you')
                         } else {
                          alert(data.message)
                          setLoading(false)
                          navigate('/')
                          
                         }
                        
                      })
                      .catch((err)=>{
                        console.log(err); setLoading(false)
                      })
      }
    )
    .catch((err)=>{
      setLoading(false)
      alert("Failed to connect to the Server, please try again. If the problem persists, try again after some time. We apologize for the inconvenience")
    })

  }

  function handleCheckboxToggle(index){

  const updatedOptions = [...surveyFormData.options]
  updatedOptions[index].checked = !updatedOptions[index].checked
  setSurveyFormData({ ...surveyFormData, options: updatedOptions })

  }
  
  return ( 

    
    <div className='flex flex-col justify-between items-center'>
      <Navbar />
    <div className='flex flex-col justify-between items-center text-center gap-16'>

        <HeadingHero heading={surveyFormData.heading} subheading={surveyFormData.subheading} />
        <div className='flex flex-wrap w-full  justify-center gap-10 items-center'>

{
  surveyFormData.options.map((option, index)=> {
    return <>
    <SurveyItem 
    key={index}
    id={`box${index}`}
    imageURL={'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'}
    label={option.label}
    checked={option.checked}
    onToggle={()=>handleCheckboxToggle(index)}


    />
    </>
  })
}
{/* <SurveyItem id={"box1"} imageURL={'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'} label={"I'm a designer looking to share my work"} />
<SurveyItem id={"box2"} imageURL={'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'} label={"I'm looking to hire a designer"} />
<SurveyItem id={"box3"} imageURL={'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'} label={"I'm looking for design inspiration"} />        
         */}

        </div>
        
        <button disabled={loading} onClick={handleSubmit} className='bg-[#EA4B8B] hover:bg-[#ea4b8ba3] text-white font-bold text-sm py-2 rounded-lg w-1/5'>
          {
            loading ? ("Loading...") : ("Finish") 
          }
        </button>
        
    </div>
    </div>
  )
}

export default SurveyPage
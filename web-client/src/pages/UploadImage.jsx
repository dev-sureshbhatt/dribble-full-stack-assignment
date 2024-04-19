import React, { useEffect, useState } from 'react'
import HeadingHero from '../components/HeadingHero'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const UploadImage = () => {

  const [profileImage, setProfileImage] = useState([])
  const [location, setLocation] = useState("")
  const navigate = useNavigate()
  const userDetails = useSelector((state) => state.auth)
  const userName = userDetails.user.name
  // const userToken = userDetails.token  
  
  // useEffect(() => {
  //   // Check if the userToken is empty or undefined
  //   if (!userToken) {
  //     navigate('/');
  //   }
  // }, [navigate, userToken])
  
 
  function handleSubmit(ev){
    ev.preventDefault()

    const data = new FormData()
    data.append('file', profileImage[0])
    data.set('location', location)
    
    
    fetch("http://localhost:4000/api/users/uploadimage", {
      method: "POST",
      body: data,
      credentials: 'include'
    })

  }
  
  return (

    
  

<div className='flex flex-col justify-center items-center'>
  <Navbar />

<div>
  <HeadingHero heading={`Welcome ${userName}! Let's create your profile`} subheading={"Let others get to know you better! You can do these later"} />

<div className=''>
<form
onSubmit={handleSubmit} 
className="">

<div className='mb-6'>
<h2 className="text-lg font-extrabold mb-4">Add an avatar</h2>
<div className='flex flex-wrap items-center gap-4'>

<img
      className="h-[180px] w-[180px] object-cover border-2 border-dashed rounded-full"
      src={profileImage && profileImage.length > 0 ? URL.createObjectURL(profileImage[0]) : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"}
      alt="Selected profile photo"
    />
{/* <img className="h-[180px] w-[180px] object-cover border-2 border-dashed rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" /> */}

<input 
  type="file"
  name="file"
  required
  onChange={(ev)=>{setProfileImage(ev.target.files)}} 
  className="text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:border-0
      file:text-sm file:font-semibold
      file:text-black
      hover:file:bg-violet-100
    "/>
</div>
</div>

<div className='mb-10'>

<h2 className='text-lg font-extrabold mb-4'>Add your location</h2>
<input 
  className='focus:outline-none border-b-2 w-full' 
  type='text' 
  placeholder='Enter a location'
  value={location}
  onChange={ev => setLocation(ev.target.value)} 
  />

</div>
  <div className='w-1/3'>
    
  <button 
  
  className='bg-[#EA4B8B] hover:bg-[#ea4b8ba3] text-white font-bold text-sm py-2 w-full rounded-lg mb-6'>Next</button>
  
  </div>
</form>
</div>


</div>
    </div>)

}

export default UploadImage
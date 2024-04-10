import React from 'react'

const UploadImage = () => {
  return (<div className='h-screen flex justify-center items-center'>


<div>
<div className='mb-6'>
  <h1 className='font-extrabold text-3xl mb-5'>Welcome! Let's create your profile</h1>
  <span className='text-slate-600'>Let others get to know you better! You can do these later</span>
</div>

<div className=''>
<form className="">

<div className='mb-6'>
<h2 className="text-lg font-extrabold mb-4">Add an avatar</h2>
<div className='flex items-center gap-4'>
<img className="h-[180px] w-[180px] object-cover border-2 border-dashed rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
<input type="file" className="text-sm text-slate-500
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
<input className='focus:outline-none border-b-2 w-full' type='text' placeholder='Enter a location' />

</div>
  <div className='w-1/3'>
  <button className='bg-[#EA4B8B] hover:bg-[#ea4b8ba3] text-white font-bold text-sm py-1 w-full rounded-lg mb-6'>Next</button>
  </div>
</form>
</div>


</div>
    </div>)

}

export default UploadImage
import React, { useState } from 'react'

const InputDiv = ({onChange, ...props}) => {

  const  [value, setValue] = useState("")
  
  return (
    
    <div className='mb-6'>
    
<div>
    <span></span>
    <label className='font-bold'>{props.label}</label>
</div>
<div>
<input 
      onChange={
        (ev)=>onChange(ev.target.value)
      }
      required 
      name={props.name} 
      type={props.type} 
      autoComplete='off' 
      className='bg-[#F3F3F3] placeholder-slate-500 focus:outline-none px-3 py-2 rounded-md w-full' 
      placeholder={props.placeholder}>
      
</input>
</div>



</div>

  )
}

export default InputDiv
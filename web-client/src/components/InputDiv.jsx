import React, { useState } from 'react'

const InputDiv = ({...props}) => {
  
  return (
    
    <div className='mb-6'>
    
<div>
    <span></span>
    <label className='font-bold'>{props.label}</label>
</div>
<div>
<input name={props.name} type={props.type} autoComplete='off' className='bg-[#F3F3F3] placeholder-slate-500 focus:outline-none px-3 py-2 rounded-md w-full' placeholder={props.placeholder}></input>
</div>



</div>

  )
}

export default InputDiv
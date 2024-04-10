import React from 'react'

const SurveyItem = ({imageURL, label, id}) => {
  return (
    <label htmlFor={id}>
        <div className='border-2 border-slate-200 p-3 rounded-2xl'>
             
            <div className='flex h-[200px] w-[200px] flex-col justify-between items-center'>
            <img className="h-[120px] w-[120px] object-cover border-2" src={imageURL} alt="Current profile photo" />
            <p className='font-bold text-slate-900'>{label}</p>
            <input className='rounded-full' id={id} type='checkbox' />
            </div>            
            </div>
            </label>
  )
}

export default SurveyItem
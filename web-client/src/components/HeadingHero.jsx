import React from 'react'

const HeadingHero = ({heading, subheading}) => {
  return (
    <div className='mb-6'>
    <h1 className='font-extrabold text-3xl mb-5'>{heading}</h1>
    <span className='text-slate-600'>{subheading}</span>
  </div>
  )
}

export default HeadingHero
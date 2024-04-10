import React, { useState } from 'react'
import InputDiv from './InputDiv'



const SignUpFlow = () => {


//State variables for form
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
     


//functions
function handleFormSubmit(ev){
    ev.preventDefault()
    
    console.log(name, email, password, username)

    fetch('http://localhost:4000/api/users', {
        method: 'POST',
        body: JSON.stringify({name, username, email, password}),
        headers: {'Content-Type': 'application/json'}
    })

}




  return (
    <div className='font-mono flex h-screen justify-center'>
        <div className="hidden md:inline sm:w-2/5">
            <img src='\src\assets\signup-bg2.png' className="h-screen w-full"/>
        </div>
        
        <div className='sm:w-3/5 bg-white'>
            <div className='text-right'>
                <span>Already a member?</span>
                <span className='font-bold text-[#473B8F]'>Sign in</span>
            </div>





<div className='max-w-[400px] mx-auto'>
            <div className='mb-5'>
                <span className='text-3xl font-semibold'>Sign up to Dribble</span>
            </div>

            <div className='mb-6'>
                <span>
                    <ul role='list' className='marker:text-red-500 list-disc pl-5 space-y-3 text-red-500'>
                        <li role='listitem'>
                            Username is already been taken
                        </li>
                    </ul>
                </span>
            </div>


<form>
    <div className='flex justify-between flex-col gap-2 sm:flex-row '>
        <InputDiv type="text" label="Name" placeholder="name" />
        <InputDiv type="password" label="Username" placeholder="username" />
    </div>
        <InputDiv label="Email" placeholder="email" />
        <InputDiv label="Password" placeholder="6+ characters" />
</form>
<div className='mb-6 flex gap-1 items-start'>
    <input id='verify-terms' type='checkbox' />
    <label htmlFor='verify-terms' className='text-slate-500 leading-4 font-normal'>Creating an account means you're okay with out terms of Service, Privacy Policy, and out default Notification Settings</label>
</div>

<button className="bg-[#EA4B8B] hover:bg-[#ea4b8ba3] text-white font-bold py-2 px-8 rounded-lg mb-6">Create Account</button>

<p className='text-xs font-semibold text-slate-400'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service Apply</p>
</div>




            {/* <h2>Sign up to Dribble</h2>
            {error && <ul><li>Username has already been taken</li></ul>}
            <form onSubmit={handleFormSubmit}>

                <label htmlFor='name'>Name</label>
                <input type='text' id='name' onChange={(ev)=> setName(ev.target.value)} />
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' onChange={(ev)=> setUsername(ev.target.value)} />
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' onChange={(ev)=> setEmail(ev.target.value)} />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' onChange={(ev)=> setPassword(ev.target.value)} />
                <button className="bg-[#EA4B8B] hover:bg-[#ea4b8ba3] text-white font-bold py-2 px-8 rounded-lg">Create Account</button>

            </form> */}

        </div>
    </div>
  )
}

export default SignUpFlow
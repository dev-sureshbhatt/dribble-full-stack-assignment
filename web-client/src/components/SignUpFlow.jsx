import React, { useState } from 'react'

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
    <div>
        <div>Image Div</div>
        <div>
            <p>Already a member? Sign In</p>
            <h2>Sign up to Dribble</h2>
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
                <button>Create Account</button>

            </form>
        </div>
    </div>
  )
}

export default SignUpFlow
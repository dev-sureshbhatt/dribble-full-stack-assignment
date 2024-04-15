import React, { useState } from "react";
import InputDiv from "../components/InputDiv";
import { Link } from "react-router-dom";

const SignUpFlow = () => {

  function handleFormSubmit(ev){
    ev.preventDefault()
  }
    
    
    // const [formData, setFormData] = useState({})

    // function handleChange(ev){
    //     setFormData((prevFormData)=>({ ...prevFormData, [ev.target?.name]: ev.target?.value }))
    //     console.log(formData)
    //   }
  return (
    <section className="flex justify-center">
      
      {/* left fold Image div */}
      
      <div className="hidden md:inline sm:w-2/5">
        <img src="\src\assets\signup-bg2.png" className="h-screen w-full" />
      </div>

       {/* for sign in link (not navbar)*/}
      <div className="sm:w-3/5 bg-white">
        <div className="text-right">
          <span>Already a member? </span>
          <span className="font-bold">
            <Link to={"/upload-image"}> Sign in</Link>
          </span>
        </div>

        {/* form heading  */}
        <div className="max-w-[400px] mx-auto">
          <div className="mb-5">
            <span className="text-3xl font-semibold">Sign up to Dribble</span>
          </div>


        {/* for error messages display */}
          <div className="mb-6">
            <span>
              <ul
                role="list"
                className="marker:text-red-500 list-disc pl-5 space-y-3 text-red-500"
              >
                <li role="listitem">Username is already been taken</li>
              </ul>
            </span>
          </div>


        {/* form body goes here */}
          <form onSubmit={handleFormSubmit}>


            <div className="flex justify-between flex-col gap-2 sm:flex-row ">
              
              {/* Importing each input components*/}
              <InputDiv 
                name='name'
                type="text" 
                label="Name" 
                placeholder="name"
                required='true'
            />
              
              <InputDiv
                name="username"
                type="text"
                label="Username"
                placeholder="username"
                required='true'
              />
            </div>


            <InputDiv 
                name="email"
                type="email"
                label="Email" 
                placeholder="email"
                required="true" />


            <InputDiv 
                name="password"
                label="Password" 
                placeholder="6+ characters"
                type='password'
                
                
            />
          
          
          
          
          {/* privacy policy checkbox label inside of the form body  */}
          <div className="mb-6 flex gap-1 items-start">
            
            
            <input 
                id="verify-terms" 
                type="checkbox"
                required
                
                />
            
            <label
              htmlFor="verify-terms"
              className="text-slate-500 leading-4 font-normal"
            >
              Creating an account means you're okay with out{" "}
              <Link to={"/"}>terms of Service, Privacy Policy</Link>, and our
              default <Link to={"/"}>Notification Settings</Link>
            
            </label>
            </div>

    {/* form button */}
          <button className="bg-[#EA4B8B] hover:bg-[#ea4b8ba3] text-white font-bold py-2 px-[40px] rounded-lg mb-6">
            Create Account
          </button>

          </form>

{/* privacy disclaimer */}
          <p className="text-xs font-semibold text-slate-400">
            This site is protected by reCAPTCHA and the{" "}
            <Link to={"/"}>Google Privacy Policy</Link> and{" "}
            <Link to={"/"}>Terms of Service</Link> Apply
          </p>
        </div>
      </div>


    </section>
  );
};

export default SignUpFlow;
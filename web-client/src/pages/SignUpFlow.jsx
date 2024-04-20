import React, { useState } from "react";
import InputDiv from "../components/InputDiv";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { setCredentials } from "../features/auth/authSlice";



const SignUpFlow = () => {

  const BASEURL = 'https://aeonaxy-full-stack-assignment.onrender.com'


  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (fieldName, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }));
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true)
    // Send formData to API
    console.log(formData);
    setError(null)

    //sending fetch request

    fetch(`${BASEURL}/api/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) =>
        response
          .json()
          .then((data) => {
            //When the user creation is not successful, the API sends an object with success:false value. 
            
            if(data.success == false) {
              console.log(data.message)
              setError(data.message)
              setLoading(false)
            }

            if (data.success == true){
              console.log(data.message)
              console.log("respone data is", data.responseData)
              console.log("dispatching Redux state")
              dispatch(setCredentials(data))
              console.log("dispatched, please check state")

              navigate('/upload-image')
            }
          })
          .catch((err) => 
          {setLoading(false)
          console.log(err)})
      )
      .catch((err) => {
        alert("Failed to connect to the Server, please try again. If the problem persists, try again after some time. We apologize for the inconvenience")
        setLoading(false)
      
      });
  };

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
          
          {error && (<div className="mb-6">
            <span>
              <ul
                role="list"
                className="marker:text-red-500 list-disc pl-5 space-y-3 text-red-500"
              >
                <li role="listitem">{error}</li>
              </ul>
            </span>
          </div>)}
          

          {/* form body goes here */}
          <form onSubmit={handleFormSubmit}>
            <div className="flex justify-between flex-col gap-2 sm:flex-row ">
              {/* Importing each input components*/}
              <InputDiv
                name="name"
                type="text"
                label="Name"
                placeholder="name"
                required="true"
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
              />

              <InputDiv
                name="username"
                type="text"
                label="Username"
                placeholder="username"
                required="true"
                value={formData.username}
                onChange={(value) => handleChange("username", value)}
              />
            </div>

            <InputDiv
              name="email"
              type="email"
              label="Email"
              placeholder="email"
              required="true"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
            />

            <InputDiv
              name="password"
              label="Password"
              placeholder="6+ characters"
              type="password"
              value={formData.password}
              onChange={(value) => handleChange("password", value)}
              required="true"
            />

            {/* privacy policy checkbox label inside of the form body  */}
            <div className="mb-6 flex gap-1 items-start">
              <input id="verify-terms" type="checkbox" required />

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
            <button disabled={loading} className="bg-[#EA4B8B] disabled:bg-[#ea4b8ba3] hover:bg-[#ea4b8ba3] text-white font-bold py-2 px-[40px] rounded-lg mb-6">
              {loading ? ("Loading...") : ("Create Account")}
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

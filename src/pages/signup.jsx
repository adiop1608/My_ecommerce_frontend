import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return; 
    }
    
    setError(""); // Clear errors if any
    
    try {
      const response = await axios.post(`${backendUrl}/auth/signup`, {
        email: formData.email,
        password: formData.password, 
        
      });
      console.log("Signup Success:", response.data.user.email);
      
    } catch (error) {
      console.error("Signup Failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Signup failed!");
    }
  };
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };
  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordFocused(true);
  };


  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordFocused(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f2f0eb] fixed merriweather-regular">
      <div className="bg-white px-20 py-20 w-[500px]">
        <div id="logo" className="mb-4 px-25">
          <img
            src="../src/assets/logo.png"
            alt=""
            className="size-10 inline-block "
          />
          <span className="ml-2 ">Shopsphere</span>
        </div>
        <label className="text-2xl px-11  ">Create a New Account</label>

        <form action="" className="mt-8 mb-4" onSubmit={handleSubmit} >
          <div id="email" className="mb-4">
            <div>
              <span className="block text-lg font-semibold mb-2 ">Email:</span>
            </div>

            <input
              id="emailInput"
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              
              className={`w-full p-2 border rounded-md transition-all duration-300 ${
                isEmailFocused
                  ? "ring-2 ring-blue-500 shadow-lg border-none"
                  : "border-gray-300  "
              } focus:outline-none`}
              required
            />
          </div>

          <div className=" mb-4  " id="Password">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-lg font-semibold">Password:</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className={`w-full p-2 border rounded-md transition-all duration-300 ${
                isPasswordFocused
                  ? "ring-2 ring-blue-500 shadow-lg border-none"
                  : "border-gray-300"
              } focus:outline-none`}
              required
            />
          </div>

          <div className=" mb-4  " id="Password">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-lg font-semibold">Confirm Password:</span>
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              onFocus={handleConfirmPasswordFocus}
              onBlur={handleConfirmPasswordBlur}
              className={`w-full p-2 border rounded-md transition-all duration-300 ${
                isConfirmPasswordFocused
                  ? "ring-2 ring-blue-500 shadow-lg border-none"
                  : "border-gray-300"
              } focus:outline-none`}
              required
            />
          </div>
          
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="bg-blue-500 rounded-lg w-full py-2 text-white cursor-pointer hover:bg-blue-600">
            Create Account
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Already a member? </span>
         <Link to="/login"> <span className="text-indigo-600 cursor-pointer hover:text-red-500">Login</span></Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import shopsphereLogo from '../assets/logo.png'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
function Login() {
  const navigate = useNavigate();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };
  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!backendUrl) {
      alert("Backend URL is missing!");
      return;
    } 
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/auth/login`,
        { email, password },
        { withCredentials: true } 
      )
      const token = response.data.token;
      login(token)
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login Failed!");
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f2f0eb] fixed ">
      <div className="bg-white px-20 py-20 w-[500px]">
        <div id="logo" className="mb-4 px-25">
          <img
            src={shopsphereLogo}
            alt=""
            className="size-10 inline-block "
          />
          <span className="ml-2 merriweather-regular">Shopsphere</span>
        </div>
        <label className="text-3xl px-10   merriweather-regular ">Login to Continue</label>

        <form onSubmit={handleLogin} action="" className="mt-8 mb-4">
          <div id="email" className="mb-4">
            <div>
              <span className="block text-lg font-semibold mb-2 merriweather-regular">Email:</span>
            </div>

            <input
              id="emailInput"
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="email"
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              className={`w-full p-2 merriweather-regular border rounded-md transition-all duration-300 ${
                isEmailFocused
                  ? "ring-2 ring-blue-500 shadow-lg border-none"
                  : "border-gray-300"
              } focus:outline-none`}
            />
          </div>

          <div className=" mb-4  " id="Password">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-lg font-semibold merriweather-regular">Password:</span>
              <span className="text-indigo-600 cursor-pointer text-sm hover:text-red-500">Forgot Password ?</span>
            </div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className={`w-full merriweather-regular p-2 border rounded-md transition-all duration-300 ${
                isPasswordFocused
                  ? "ring-2 ring-blue-500 shadow-lg border-none"
                  : "border-gray-300"
              } focus:outline-none`}
            />
          </div>
          <button type="submit" className="bg-blue-500 rounded-lg w-full py-2 text-white cursor-pointer hover:bg-blue-600 merriweather-regular">
            Login
          </button>
        </form>
        <div className="mt-4 text-center merriweather-regular">
          <span>Not a member? </span>
          <Link to="/signup"><span className="text-indigo-600 cursor-pointer hover:text-red-500 merriweather-regular">Create Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

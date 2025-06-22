import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import {
  faBox,
  faCartShopping,
  faHeart,
  faRightFromBracket,
  faSearch,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import debounce from "lodash/debounce";
import shopsphereLogo from '../assets/logo.png'
function Navbar({onSearch}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery,setSearchQuery] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token Found");
          return;
        }
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        const res = await axios.get(`${backendUrl}/auth/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);
  const handleSearchFocus = () => {
    setIsSearchFocus(true);
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleSearchBlur = () => {
    setIsSearchFocus(false);
  };
  const debouncedSearch = debounce((query) => {
    if (onSearch) onSearch(query);
  }, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <nav className="div1 bg-white text-black min-w-full h-28 flex flex-row items-center justify-between p-7 text-nowrap shadow-lg style-none relative ">
      <Link to="/dashboard">
        <div className="flex flex-row items-center cursor-pointer">
          <img
            className=" size-[50px] rounded-full flex "
            src={shopsphereLogo}
            alt="logo"
          />
          <p className="ml-4 hover:text-blue-500 hover:underline hover:underline-offset-8 cursor-pointer ">
            ShopSphere
          </p>
        </div>
      </Link>

      <div className="flex items-center">


      <a href="" className="hidden md:flex">
        <FontAwesomeIcon
          icon={faSearch}
          className=" hidden  mt-[3.5px] mr-5 hover:text-amber-200"
          />
      </a>

      <input
        type="text"
        placeholder="search"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        className={`hidden md:flex bg-white text-black rounded-md w-[600px] h-9 pl-2 transition-all duration-300 border border-amber-100 ${
          isSearchFocus ? "ring-2 ring-blue-500 shadow-lg" : "border-gray-500"
        } focus:outline-none`}
        />
        </div>

      <ul className="hidden md:flex flex-row">
        {/*
        <li className="mr-10 ml-30 hover:text-blue-500 hover:underline hover:underline-offset-8 cursor-pointer">
          <FontAwesomeIcon
            icon={faUser}
            className=" inline-block mt-[3.5px] mr-3"
            />
          Profile
        </li>


          <li className="mr-10 ml-10  hover:text-blue-500  hover:underline hover:underline-offset-8 cursor-pointer">
          <FontAwesomeIcon
            icon={faHeart}
            className=" inline-block mt-[3.5px] mr-3 text-red-500"
            />
          WishList
        </li>
          */}

        <Link to="/cart">
          <li className="mr-10 ml-10  hover:text-blue-500  hover:underline hover:underline-offset-8 cursor-pointer">
            <FontAwesomeIcon
              icon={faCartShopping}
              className=" inline-block mt-[3.5px] mr-3"
            />
            Cart
          </li>
        </Link>
        <Link to='/myorder'>
        <li className="mr-10 ml-10  hover:text-blue-500  hover:underline hover:underline-offset-8 cursor-pointer">
          <FontAwesomeIcon
            icon={faBox}
            className=" inline-block mt-[3.5px] mr-3"
            />
          My Orders
        </li>
            </Link>
        <Link to="/admin">
          {user && user.role === "Admin" && (
            <li className="mr-10 ml-10  hover:text-blue-500  hover:underline hover:underline-offset-8 cursor-pointer">
              <FontAwesomeIcon
                icon={faUserTie}
                className=" inline-block mt-[3.5px] mr-3"
              />
              Admin
            </li>
          )}
        </Link>
        <li
          className="mr-10 ml-4  hover:text-blue-500  hover:underline hover:underline-offset-8 cursor-pointer"
          onClick={handleLogout}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className=" inline-block mt-[3.5px] mr-3 "
          />
          Logout
        </li>
      </ul>

      <div className="ml-auto relative md:hidden">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center text-black hover:text-blue-5`00"
        >
          <Menu size={24} />
        </button>
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-black text-white border border-gray-700 rounded-lg shadow-lg p-2">
            {/* <li className="px-4 py-2 hover:text-blue-400 cursor-pointer flex items-center ">
              <FontAwesomeIcon icon={faUser} className="mr-3" /> Profile
            </li>
            <li className="px-4 py-2 hover:text-blue-400 cursor-pointer flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-3" /> Wishlist
            </li> */}
            <Link to="/cart">
              <li className="px-4 py-2 hover:text-blue-400  cursor-pointer flex items-center">
                <FontAwesomeIcon icon={faCartShopping} className="mr-3" /> Cart
              </li>
            </Link>
            <Link to='/myorder'>
            <li className="px-4 py-2 hover:text-blue-400 cursor-pointer flex items-center">
              <FontAwesomeIcon icon={faBox} className="mr-3" /> My Orders
            </li>
            </Link>
            <Link to="/admin">
              {user && user.role === "Admin" && (
                <li className="px-4 py-2 hover:text-blue-400 cursor-pointer flex items-center">
                  <FontAwesomeIcon icon={faUserTie} className="mr-3" /> Admin
                </li>
              )}
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
}
export default Navbar;

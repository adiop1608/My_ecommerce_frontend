import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faBoxesPacking,
    faCubes,
    faGaugeHigh,
    faUsers,
    faBars
  } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function adminbar({ setSelectedPage }) {
  
  return (
    <aside className="min-h-screen bg-gray-50 p-4 shadow-xl py-10 rounded-xl flex flex-col text-gray-700 text-lg poppins-regular text-nowrap ">
        <div>
        <h1 className="text-2xl font-extrabold bg-gray-200 rounded-2xl flex items-center justify-center py-1 lato-bold text-gray-900"> Admin Panel</h1>
        <div className=" mt-4 flex flex-col px-4 py-4 ">
            <button className="  py-1 hover:bg-gray-300 rounded-2xl w-full cursor-pointer flex flex-row items-center justify-center font-semibold shadow-xl hover:text-gray-900" onClick={() => setSelectedPage("dashboard")} > 
            <FontAwesomeIcon
                  icon={faGaugeHigh}
                  className=" hidden  mt-[3.5px] mr-3 "
                  />
                DashBoard </button>

        <button className="mt-6 py-1 hover:bg-blue-500 hover:text-white rounded-2xl w-full cursor-pointer font-semibold shadow-xl" onClick={() => setSelectedPage("users")}>            <FontAwesomeIcon
                  icon={faUsers}
                  className=" hidden  mt-[3.5px] mr-3  "
                /> Users </button>
        <button className="mt-6 py-1  hover:bg-red-500 hover:text-white rounded-2xl w-full cursor-pointer font-semibold shadow-xl"  onClick={() => setSelectedPage("products")}> <FontAwesomeIcon
                  icon={faCubes}
                  className=" hidden  mt-[3.5px] mr-3 "
                />Products </button>
        <button className="mt-6 py-1 hover:bg-green-500 
        hover:text-gray-950 rounded-2xl w-full cursor-pointer font-semibold shadow-xl" onClick={() => setSelectedPage("orders")}> <FontAwesomeIcon
                  icon={faBoxesPacking}
                  className=" hidden  mt-[3.5px] mr-3 "
                />Orders </button>
        </div>
        </div>
    </aside>
  );
}
export default adminbar;

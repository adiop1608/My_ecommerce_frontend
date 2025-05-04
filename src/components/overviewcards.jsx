import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function OverviewCard({title,count,Icon}) {
  const bgColor =
  title.toLowerCase() == "users"
    ? "bg-blue-500 text-white"
    : title.toLowerCase() === "product"
    ? "bg-red-500 text-white"
    : title.toLowerCase() === "orders"
    ? "bg-green-500 text-black"
    : "bg-gray-200";
  return (
    <div className={`${bgColor} border-1 border-gray-300 text-slate-800 w-1/2 h-64 flex items-center justify-center   rounded-xl  mb-4 mr-4  shadow-lg cursor-pointer `}>
      <div className="flex items-center justify-center object-cover transition-transform duration-300 ease-in-out hover:scale-110  ">

      
      <div className="px-6 flex flex-col items-center">
        <p className="text-5xl">{count}</p>
        <p className=" mt-2 text-2xl merriweather-regular ">{title}</p>
        
      </div>
      <div className="text-7xl md:flex items-end justify-end hidden">
      <FontAwesomeIcon
        icon={Icon}
        className=" hidden px-2 "
        />
        </div>
</div>
    </div>
  );
}
export default OverviewCard;

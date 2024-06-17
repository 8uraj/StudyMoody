import React from 'react'
import { Link } from 'react-router-dom'
export default function Button({children,active,linkto,width}) {
  return (
    <Link to={linkto} >
      <div
        className={`hover:scale-95    transition-all duration-300 text-center ${width?width:"w-fit"} text-[15px] px-2 md:px-6 py-3  rounded-md font-bold ${
          active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"
        } `}
      >
        {children}
      </div>
    </Link>
  );
}

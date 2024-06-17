import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Logout from '../../services/auth/Logout';
import { useNavigate } from 'react-router-dom';
import { VscDashboard } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";
export default function ProfileDropDown() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutUser=async()=>{
      Logout(dispatch,navigate);
  }
  return (
    <div className=" relative top-16  bg-richblack-800    text-white       z-10 rounded-lg flex flex-col">
      <Link
        to="/dashboard/my-profile"
        className="hover:bg-richblack-700 border-b-[1px] px-2 py-2  border-b-richblack-200 flex gap-1 items-center"
      >
        {" "}
        <VscDashboard className="inline" size="20px" height="20px" /> dashboard
      </Link>

      <div
        onClick={logoutUser}
        className=" px-2 py-2 flex gap-1 items-center hover:bg-richblack-700 "
      >
        {" "}
        <IoMdLogOut className="inline" size="20px" height="20px" />
        Logout
      </div>
    </div>
  );
}

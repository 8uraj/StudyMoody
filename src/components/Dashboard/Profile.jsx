import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../common/IconBtn";
import ProfileEditBtn from "./ProfileEditBtn";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const{token}=useSelector((state)=>state.auth);
  const { user  } = useSelector((state) => state.profile);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-[2rem] font-semibold text-white w-full mb-8">
        My Profile
      </div>
      <div className="items-center flex-wrap gap-4  justify-center md:justify-between flex w-full bg-richblack-800 border-richblack-700 border-[1px] p-4 md:p-6 rounded-md">
        <div className="flex gap-4 flex-wrap  ">
          <img src={user?.image} className="w-[80px] rounded-full m-auto"></img>
          <div className="text-white w-full md:w-fit text-[1.1rem] font-semibold flex flex-col gap-2  justify-center ">
            <div className="w-full text-center md:text-start ">
              {user?.firstName + " " + user?.lastName}
            </div>
            <div className="text-wrap text-center md:text-start overflow-auto w-full">
              {user?.email}
            </div>
          </div>
        </div>

        <ProfileEditBtn text="Edit" customClasses=" px-8 h-[40px] " />
      </div>
      <div className=" text-white   gap-4 flex flex-col w-full bg-richblack-800 border-richblack-700 border-[1px] p-6 rounded-md">
        <div className="flex justify-between w-full">
          <div className="text-[1.4rem] font-semibold">About</div>
          <ProfileEditBtn text="Edit" customClasses=" px-8 h-[40px] " />
        </div>
        <div className="text-start  md:w-[80%] w-full">
          {user?.additionalDetails?.about || "- -"}
        </div>
        <div className="text-start font-semibold text-[1.1rem] w-full">
          Account Type : {user?.accountType}
        </div>
      </div>
      <div className=" items-center justify-between gap-4 flex flex-col w-full bg-richblack-800 border-richblack-700 border-[1px] p-6 rounded-md ">
        <div className="text-white w-full flex justify-between items-center ">
          <div className="text-[1.3rem] font-semibold">Personal Details</div>
          <ProfileEditBtn text="Edit" customClasses=" px-8 h-[40px] " />
        </div>
        <div className="text-white justify-center w-full flex gap-4 flex-wrap md:justify-between items-center ">
          <div className="w-full md:w-[48%]">
            <p className="text-richblack-300">FirstName</p>
            <p>{user?.firstName}</p>
          </div>
          <div className="w-full md:w-[48%]">
            <p className="text-richblack-300">LastName</p>
            <p>{user?.lastName}</p>
          </div>
          <div className="w-full md:w-[48%]">
            <p className="text-richblack-300">Email</p>
            <p>{user?.email}</p>
          </div>
          <div className="w-full md:w-[48%]">
            <p className="text-richblack-300">Phone No.</p>
            <p>{user?.additionalDetails?.contactNumber || "- -"}</p>
          </div>
          <div className="w-full md:w-[48%]">
            <p className="text-richblack-300">Gender</p>
            <p>{user?.additionalDetails?.gender || "- -"}</p>
          </div>
          <div className="w-full md:w-[48%]">
            <p className="text-richblack-300">Date of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth || "- -"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

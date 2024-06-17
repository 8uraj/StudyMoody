import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
export default function UpdatePass({user}) {
    const [pass,setpass]=useState({
        password:"",
        confirmPassword:""
    });
    const [pass1, setpass1] = useState(false);
    const [pass2, setpass2] = useState(false);
    const handlechange=(e)=>{
        const term=e.target.name;
        const val=e.target.value;
        setpass((prev)=>{
            return {
                ...prev,
                [term]:val
            }
        })
    }
   
  return (
    <div className=" w-full flex flex-wrap justify-center md:justify-start bg-richblack-800 border-[1px] border-richblack-700 p-2 md:p-8 gap-4 my-8 rounded-md">
      <div className="w-full font-semibold text-lg text-center md:text-start ">
        Update Password
      </div>
      <form className="flex  flex-col md:flex-row w-full flex-wrap gap-4 justify-around p-2 ">
        <div className="md:w-[45%] flex flex-col gap-2">
          <div>Password</div>
          <input
            placeholder="Enter password"
            value={pass.password}
            onChange={handlechange}
            type={`${pass1 ? "text" : "password"}`}
            name="password"
            className="text-white rounded-md p-2 bg-richblack-600"
          ></input>
          <span className="relative bottom-[38%]  left-[88%] w-[30px]">
            {pass1 ? (
              <IoIosEyeOff onClick={() => setpass1(false)} size={"25px"} />
            ) : (
              <FaEye onClick={() => setpass1(true)} size={"25px"} />
            )}
          </span>
        </div>
        <div className="md:w-[45%] flex flex-col gap-2">
          <div>Confirm Password</div>
          <input
            placeholder="Enter confirm password"
            value={pass.confirmPassword}
            onChange={handlechange}
            type={`${pass2 ? "text" : "password"}`}
            name="confirmPassword"
            className="text-white rounded-md p-2 bg-richblack-600"
          ></input>
          <span className="relative bottom-[38%]  left-[88%] w-[30px]">
            {pass2 ? (
              <IoIosEyeOff onClick={() => setpass2(false)} size={"25px"} />
            ) : (
              <FaEye onClick={() => setpass2(true)} size={"25px"} />
            )}
          </span>
        </div>

        <div className="w-full justify-center md:justify-end   flex">
          <button
            type="submit"
            className=" md:relative md:right-5 font-bold bg-yellow-50 text-black p-2 px-6 rounded-md hover:scale-105 duration-700 transition-all"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

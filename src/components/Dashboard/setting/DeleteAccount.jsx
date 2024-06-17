import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
export default function DeleteAccount({user}) {
    const [data,setdata]=useState("");
    const  [text,settext]=useState("");
  return (
    <div className=" w-full flex gap-4 flex-wrap justify-center md:justify-start bg-pink-800 border-[1px] border-richblack-700 p-4 md:p-8  my-8 rounded-md">
      <div className="p-4  rounded-full bg-pink-700 h-[70px] flex justify-center items-center w-[70px]  ">
        <MdDeleteOutline size={"40px"} color="red" className='m-auto' />
      </div>
      <div className="flex flex-col items-center md:items-start w-full md:w-[90%] gap-2">
        <div  className= "font-semibold text-lg">Delete Account</div>
        <div>Would you like to delete account?</div>
        <div className='max-w-[500px]' >
          This account may contain Paid Courses. Deleting your account is
          permanent and will remove all the contain associated with it.
        </div>
        
        <button className='p-2  bg-pink-300 w-[250px] rounded-md text-black' >I want to delete my account</button>
      </div>
    </div>
  );
}

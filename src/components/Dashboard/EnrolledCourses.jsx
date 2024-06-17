import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EnrolledCourseCard from './EnrolledCourseCard';
export default function EnrolledCourses() {
    const {user}=useSelector((state)=>state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate=useNavigate();
    const[status,setstatus]=useState("All");

    const changeStatus=(e)=>{
      const val=e.target.innerHTML;
      setstatus(val);
    }
    const [courses,setcourses]=useState(null);
    useEffect(()=>{
        ;(async()=>{
          var url = import.meta.env.VITE_REACT_APP_BASE_URL;
             try{
                 const result = await axios.post(`${url}/profile/getEnrolledCourses`,{token});
                 
                
                 setcourses(result?.data?.courses);
                
             }
             catch(err){
                console.log(err);
             }
        })()
       
    },[])
  return (
    <div className="text-white flex flex-col gap-8 ">
      <div className="text-richblack-400">
        Home \ dashboard \ Enrolled-courses
      </div>
      <div className="flex gap-2 bg-richblack-700 px-4 py-2 rounded-full w-full md:w-[70%]">
        <div
          className={`rounded-full  px-6 py-2 ${
            status === "All" ? "bg-richblack-800" : ""
          }`}
          onClick={changeStatus}
        >
          All
        </div>
        <div
          className={`rounded-full  px-4 py-2 ${
            status === "Pending" ? "bg-richblack-800" : ""
          }`}
          onClick={changeStatus}
        >
          Pending
        </div>
        <div
          className={`rounded-full  px-4 py-2 ${
            status === "Completed" ? "bg-richblack-800" : ""
          }`}
          onClick={changeStatus}
        >
          Completed
        </div>
      </div>
      <div className="w-full">
       {!courses?<div className='text-center' >Loading ....</div>: (!courses.length ? (
          <div className='text-[1.2rem] font-semibold   text-center' >You have not enrolled any course <span className='text-blue-100' onClick={()=>navigate("/")} >Enroll Now!!</span> </div>
        ) : (
          <div className='w-full flex flex-col gap-4' >
            <div className='w-full flex justify-around' >
                <div className='text-[1.1rem] font-semibold'>Course</div>
            <div className='text-[1.1rem] font-semibold'>Duration</div>
            <div className='text-[1.1rem] font-semibold'>Progess</div>
            </div>
             <div className='flex flex-col gap-2' >
                {courses?.map((course,index)=>{
                    return <EnrolledCourseCard course={course} key={index} />
                })}
             </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

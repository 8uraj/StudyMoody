import React, { useEffect } from 'react'
import *as Icons from "react-icons/vsc";
import { Link, useLocation } from 'react-router-dom';
import { seteditCourse } from '../../slices/courseSlice';
import { seteditCourseInfo } from '../../slices/courseSlice';
import { useDispatch } from 'react-redux';
import { setStep } from '../../slices/courseSlice';
export default function SidebarLink({name,path,icon}) {
    const loaction=useLocation();
    const dispatch=useDispatch();
    const Icon=Icons[icon];
  return (
    <Link onClick={()=>{
        dispatch(seteditCourse(false));
        dispatch(seteditCourseInfo(null));
        dispatch(setStep(1));
    }} to={path} className={`text-sm font-medium ${path==location.pathname?"bg-yellow-800 border-l-4 border-yellow-5 transition-all duration-200 opacity-95 text-yellow-50 ":""} py-4 pl-4  flex gap-1 items-center  px-2 w-full`} >
    <Icon size={"17px"} />
    <div>{name}</div>
    
    </Link>
  )
}

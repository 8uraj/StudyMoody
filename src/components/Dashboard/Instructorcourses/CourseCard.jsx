import React, { useEffect } from "react";
import { formatDate } from "../../../services/formatDate";
import { FiClock } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { seteditCourse } from "../../../slices/courseSlice";
import { seteditCourseInfo } from "../../../slices/courseSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../slices/courseSlice";
export default function CourseCard({ course }) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const deleteCourse=async()=>{

    }
    const editCourse=async()=>{
      
        dispatch(seteditCourse(true));
        
        dispatch(seteditCourseInfo(course));
        dispatch(setStep(1));
        navigate("/dashboard/add-course");
        

    }
    useEffect(()=>{
      console.log("crs ",course);
    },[])
  return (
    <div className=" border-[1px] border-richblack-800 flex flex-wrap justify-between p-8">
      <div className="flex flex-wrap gap-4 text-richblack-100 w-[70%] ">
        <img src={course.thumbnail} className="md:w-[250px] md:h-[200px]"></img>
        <div className="flex flex-col gap-2 mt-2 text-md ">
          <div> {course.courseName}</div>
          <div>
            {" "}
            {course.courseDescription.slice(0, 100)}{" "}
            {course.courseDescription.length > 100 && "..."}
          </div>
          <div>Created At : {formatDate(course.createdAt)}</div>
          {course.status === "Draft" ? (
            <div className=" text-pink-400 bg-richblack-700 rounded-full w-[90px] text-center text-md  flex items-center justify-center gap-1  ">
              <FiClock className="inline  " size="15px" /> <div>Draft</div>
            </div>
          ) : (
            <div className="text-caribbeangreen-50 rounded-full bg-richblack-700 w-[100px] text-center ">
              Published
            </div>
          )}
        </div>
      </div>
      <div>Time</div>
      <div>{course.price}</div>
      <div className="flex gap-2" >
        <FiEdit size="20px" onClick={editCourse} />
        <MdDelete size="20px" onClick={deleteCourse} />
      </div>
    </div>
  );
}

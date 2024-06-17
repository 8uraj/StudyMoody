import React, { useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import convertSecondsToDuration from "../../utils/setToDuration";
export default function EnrolledCourseCard({ course }) {
  // useEffect(()=>{
  //   console.log(course);
  // })
  function totalcourseDuration(){

    var duration=0;
    
    course?.courseContent?.forEach((section)=>{
          section?.subSection?.forEach((subsection)=>{
             duration+= parseInt(subsection?.timeDuration);
             
          })
    })
    return duration;
  }
  return (
    <Link
      to={`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`}
      className="w-full flex justify-between items-center my-2 hover:bg-richblack-800 p-4 rounded-sm "
    >
      <div className="flex gap-[8px] flex-wrap items-center w-[40%] ">
        <div>
          <img
            src={course?.thumbnail}
            className="w-[60px] h-[60px] rounded-lg m-auto md:m-0"
          ></img>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start gap-1">
          <div className="text-[0.9rem]">{course?.courseName}</div>
          <div className="text-[0.8rem] text-richblack-100 text-center md:text-start ">
            {course?.courseDescription.slice(0, 50)}
          </div>
        </div>
      </div>
      <div className="w-[30%] px-10">
        {convertSecondsToDuration(totalcourseDuration())}
      </div>
      <div className="w-[25%] min-w-[100px] flex gap-1">
        {" "}
        <ProgressBar
          completed={course?.progressPercentage || 0}
          height="15px"
          borderRadius="7px"
          labelSize="12px"
          maxCompleted={100}
          className="w-[90%] inline"
        />
      </div>
    </Link>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../utils/GetAvgRating";
import RatingStars from "./RatingStars";
export default function CourseCard({ course, Height,width }) {

  const [rating,setrating]=useState(0);
  useEffect(()=>{
    const avg=GetAvgRating(course.ratingAndReviews);
    setrating(avg);
  },[course]);
  return (
    
    <Link
      to={`/courses/${course._id}`}
      className={  ` text-white  flex-wrap border-[1px] border-richblack-500 hover:scale-105 transition-all duration-700 hover:shadow-lg  flex flex-col gap-4 w-[330px] md:w-[370px] md:max-w-[500px]   min-w-[250px] p-2 md:p-4`}
    >
      <div className="w-full flex justify-center  items-center">
        <img src={course.thumbnail} className={`m-auto w-full max-w-[400px] md:w-[330px]    ${Height?Height:"h-full"} `}></img>
      </div>

      <p className="text-[1.3rem]  ">{course.courseName}</p>
      <div className="flex gap-2 text-richblack-400 ">
        {" "}
        {course.Instructor.firstName} {course.Instructor.lastName}
      </div>
      <div className="flex gap-1 justify-start">
        <span>{rating || 0}</span>
        <RatingStars  Review_Count={rating} />
        <span className=" text-richblack-400 ">
          {course?.ratingAndReviews?.length } Ratings
        </span>
      </div>
      <p>
        {" "}
        <span className="text-[1.1rem]">{course.price}</span> .Rs
      </p>
     
    </Link>
  );
}

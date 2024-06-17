import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../Catalogpage/RatingStars';
export default function ReviewCard({review,Height}) {

 
  return (
    <div
      
      className="bg-richblack-800 w-[300px] md:w-[350px] flex flex-col gap-4 p-4 rounded-md"
    >
      <div className="flex p-1 gap-4 ">
        <img
          src={`https://api.dicebear.com/5.x/initials/svg?seed=${
            review?.user?.firstName + " " + review?.user?.lastName
          }`}
          className="h-11 w-11 rounded-full object-cover "
        ></img>
        <div className="flex flex-col gap-1">
          <div>
            {review?.user?.firstName} {review?.user?.lastName}
          </div>
          
          <div className='text-richblack-300'>{review?.course.courseName}</div>
        </div>
      </div>
      <div>{review?.review}</div>
      <div className='flex gap-2 text-yellow-25 font-bold'>
        <span className='inline'>
        {Number.isInteger(review?.rating)?`${review?.rating}.0`:review?.rating}
        </span>
          <RatingStars Review_Count={review?.rating} ></RatingStars>{" "}
      </div>
    </div>
  );
}

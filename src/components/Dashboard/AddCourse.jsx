import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseInfo from "./CreateCourse/CourseInfo";
import CourseBuilder from "./CreateCourse/CourseBuilder";
import CoursePublish from "./CreateCourse/CoursePublish";
import { setStep } from "../../slices/courseSlice";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PiLightningFill } from "react-icons/pi";
import { TbPointFilled } from "react-icons/tb";

export default function AddCourse() {
  const {editCourse}=useSelector((state)=>state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    { id: 3, title: "Course publish" },
  ];
  return (
    <div className="text-white relative flex flex-wrap w-full  ">
      <div className=" w-full  lg:w-[60%]">
        <div className="text-[2rem] font-semibold">
          {editCourse ? "Edit Course" : "Add a Course"}{" "}
        </div>
        <div className="mt-12 mb-4 flex gap-4 justify-between md:w-[90%] w-full items-center  m-auto ">
          {steps.map((item, index) => (
            <>
              <div
                key={index}
                className={`${
                  step === item.id
                    ? "bg-yellow-900 border-[1px] border-yellow-300 -500 text-yellow-50"
                    : "border-richblack-100 bg-richblack-800 text-richblack-300"
                }  w-[40px]  h-[40px] aspect-square place-items-center place-content-center  text-center flex justify-center items-center rounded-full `}
              >
                {step > item.id ? (
                  <div className="w-[40px] h-[40px]  ">
                    <FaCheckCircle
                      className="bg-yellow-50 w-[40px] h-[40px]  rounded-full "
                      color="black"
                    />
                  </div>
                ) : (
                  <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
                    {item.id}{" "}
                  </div>
                )}
              </div>
              {item.id !== 3 && (
                <div className="overflow-x-hidden border-[1px]  relative w-full border-dashed border-richblack-500 "></div>
              )}
            </>
          ))}
        </div>
        <div className="flex gap-4 justify-between items-center  m-auto ">
          {steps.map((item) => (
            <>
              <div className="text-center text-richblack-300">{item.title}</div>
            </>
          ))}
        </div>
        {step == 1 ? (
          <CourseInfo />
        ) : step == 2 ? (
          <CourseBuilder />
        ) : (
          <CoursePublish />
        )}
      </div>

      <div className="text-white hidden min-w-[400px]  lg:visible lg:flex flex-col gap-2 p-6 bg-richblack-800 rounded-lg h-fit w-[28%] fixed translate-x-[160%]  ">
        <div className="text-[1.2rem]">
          <PiLightningFill color="orange" className="inline mx-2" />
          Course Upload Tips
        </div>
        <ul className="flex flex-col  gap-[10px] text-[14px] text-richblack-200">
          <li>
            {" "}
            <TbPointFilled className="inline" /> Set the Course Price option or
            make it free.
          </li>
          <li>
            <TbPointFilled className="inline" />
            Standard size for the course thumbnail is 1024x576.
          </li>
          <li>
            <TbPointFilled className="inline" />
            Video section controls the course overview video.
          </li>
          <li>
            <TbPointFilled className="inline" />
            Course Builder is where you create & organize a course.
          </li>
          <li>
            <TbPointFilled className="inline" />
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            <TbPointFilled className="inline" />
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>
            <TbPointFilled className="inline" />
            Make Announcements to notify any important
          </li>
          <li>
            <TbPointFilled className="inline" />
            Notes to all enrolled students at once.
          </li>
        </ul>
      </div>
    </div>
  );
}

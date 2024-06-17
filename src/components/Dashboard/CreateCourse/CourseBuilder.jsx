import React, { useEffect, useState } from "react";
import { seteditCourse, seteditCourseInfo } from "../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { IoMdAdd } from "react-icons/io";

import toast from "react-hot-toast";
import CourseContent from "./CourseBuilder/CourseContent";
 
import { setStep } from "../../../slices/courseSlice";
import axios from "axios";
import { GrFormNextLink } from "react-icons/gr";
export default function CourseBuilder() {
  const { editCourseInfo } = useSelector((state) => state.course);
  const {token}=useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [section, setsection] = useState("");
  const [editSectionName, seteditSectionName] = useState(null);
 
  const handlechange = (e) => {
    const val = e.target.value;
    setsection(val);
  };

  const cancelEdit = () => {
    
    setsection("");
    seteditSectionName(null);
   
  };  
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (section.length === 0) {
      toast.error("Enter section name");
      return;
    }
    if (editSectionName) {
      try {
        const result = await axios.post(`${url}/updateSection`, {
          token,
          updatedName: section,
          sectionId: editSectionName,
          courseId: editCourseInfo._id,
        });
        if (result.data.success) {
          toast.success("Section updated successfully");
          dispatch(seteditCourseInfo(result.data.course));
          setsection("");
          seteditSectionName(null);
        } else {
          toast.error(result.data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("Error in updating section");
      }

      return;
    }

    try {
      const result = await axios.post(`${url}/createSection`, {
        token,
        sectionName: section,
        courseId: editCourseInfo._id,
      });
      if (result.data.success) {
        toast.success("Section Created successfully");
      }

      dispatch(seteditCourseInfo(result.data.course));
      setsection("");
    } catch (err) {
      toast.error("Error in creating section");
      console.log(err);
    }
  };
  return (
    <div className="text-white mt-12 bg-richblack-800 p-4 rounded-md ">
      <p className="text-[1.4rem]">Course Builder</p>
      <form className="flex flex-col mt-8" onSubmit={handlesubmit}>
        <div className="flex flex-col gap-1">
          <div>
            <label className="text-richblack-200">Section Name </label>

            <sup className="text-pink-300 ">*</sup>
          </div>
          <input
            value={section}
            name="section"
            onChange={handlechange}
            placeholder="Add a section to build your course"
            className="bg-richblack-700 px-4 rounded-lg h-[45px] w-full  m-auto"
          ></input>
          <div className="flex  items-center gap-4 text-richblack-300">
            <IconBtn
              type="submit"
              text={editSectionName ? "Edit section Name" : "Create Section"}
              customClasses=" border-[1px]  border-yellow-200 text-yellow-200 bg-richblack-800  max-w-[200px] my-4"
            >
              <IoMdAdd className="inline mx-2 text-yellow-200" size="20px" />
            </IconBtn>

            {editSectionName && <div onClick={cancelEdit}>Cancel edit</div>}
          </div>
        </div>
      </form>

      {editCourseInfo?.courseContent.length > 0 && (
        <CourseContent
          seteditSectionName={seteditSectionName}
          setsection={setsection}
        />
      )}

      <div className="w-full  flex justify-end gap-4">
        <button
          onClick={() => {
            dispatch(setStep(1));
            dispatch(seteditCourse(true));
          }}
          className="bg-richblack-700 text-white p-1 px-4  hover:scale-105 transition-all duration-700 rounded-md  flex items-center "
        >
          Back
        </button>

        <button
          onClick={() => {
            if (editCourseInfo.courseContent.length === 0) {
              toast.error("Add at least 1 section");
              return;
            }
            if (
              editCourseInfo?.courseContent?.some(
                (section) => section.subSection.length === 0
              )
            ) {
              toast.error("Add at least 1 video in each section");
              return;
            }

            dispatch(setStep(3));
          }}
          className="bg-yellow-200 p-1 px-4 text-black hover:scale-105 transition-all duration-700 rounded-md  flex items-center "
        >
          Next
          <GrFormNextLink className="inline  " size={"25px"} />
        </button>
      </div>
    </div>
  );
}

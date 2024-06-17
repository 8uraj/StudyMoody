import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setStep, seteditCourseInfo } from "../../../slices/courseSlice";
import TagInput from "./TagInput";
import { json } from "react-router-dom";
export default function CourseInfo() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [categories, setcategories] = useState([]);
  const [tags, settags] = useState([]);

  const [thumbnail, setthumbnail] = useState(null);
  const [image, setimage] = useState("");
  const { editCourseInfo } = useSelector((state) => state.course);
  const { editCourse } = useSelector((state) => state.course);
  const onDrop = useCallback((acceptedFiles) => {
    setthumbnail(URL.createObjectURL(acceptedFiles[0]));
    setimage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [info, setinfo] = useState({
    courseName: "",
    courseDescription: "",
    price: "",
    categoryId: "65f2d9c00a85b44cb47d4cdd",
    courselevel: "All",
    courseLanguage: "English",
    tag: tags,
    benefits: "",
  });
  const isformUpdated = () => {
    if (!editCourse) {
      return false;
    }

    if (
      editCourseInfo?.courseName !== info.courseName ||
      editCourseInfo?.courseDescription !== info.courseDescription ||
      editCourseInfo?.price !== info.price ||
      editCourseInfo?.category !== info.categoryId ||
      editCourseInfo?.courselevel !== info.courselevel ||
      editCourseInfo?.courseLanguage !== info.courseLanguage ||
      editCourseInfo?.tag !== tags ||
      editCourseInfo?.benefits !== info.benefits ||
      editCourseInfo?.thumbnail !== image
    ) {
      return true;
    }

    return false;
  };
  useEffect(() => {
    if (editCourse) {
      setthumbnail(editCourseInfo?.thumbnail);
      setimage(editCourseInfo?.thumbnail);

      settags(editCourseInfo?.tag);
      setinfo({
        courseName: editCourseInfo?.courseName,
        courseDescription: editCourseInfo?.courseDescription,
        price: editCourseInfo?.price,
        categoryId: editCourseInfo?.category,
        courselevel: editCourseInfo?.courselevel,
        courseLanguage: editCourseInfo?.courseLanguage,
        tag: editCourseInfo?.tags,
        benefits: editCourseInfo?.whatYouWillLearn,
      });
    } else {
      setthumbnail(null);
      setimage("");
      settags([]);
      setinfo({
        courseName: "",
        courseDescription: "",
        price: null,
        categoryId: "65f2d9c00a85b44cb47d4cdd",
        courselevel: "All",
        courseLanguage: "English",
        tag: tags,
        benefits: "",
      });
    }

    (async () => {
      try {
        const result = await axios.get(`${url}/showAllCategories`);

        setcategories(result?.data?.data);
      } catch (err) {
        console.log("Error in fetching categories in add course");
      }
    })();
  }, [editCourse]);

  const handlechange = (e) => {
    const term = e.target.name;
    const val = e.target.value;
    setinfo((prev) => {
      return {
        ...prev,
        [term]: val,
      };
    });
  };
  const handleEditCourse = async () => {
    const toastId=toast.loading("...Updating the course");
    try{
        const formData = new FormData();
         formData.append("courseId",editCourseInfo._id);
        if (editCourseInfo.courseName !== info.courseName) {
          formData.append("courseName", info.courseName);
        }
        if (editCourseInfo.courseLanguage !== info.courseLanguage) {
          formData.append("courseLanguage", info.courseLanguage);
        }
        if (editCourseInfo.courseDescription !== info.courseDescription) {
          formData.append("courseDescription", info.courseDescription);
        }
        if (editCourseInfo.price !== info.price) {
          formData.append("price", info.price);
        }
        if (editCourseInfo.category !== info.categoryId) {
          formData.append("categoryId", info.categoryId);
        }
        if (editCourseInfo.courselevel !== info.courselevel) {
          formData.append("courselevel", info.courselevel);
        }
        if (editCourseInfo.tag !== tags) {
         
          formData.append("tag", JSON.stringify(tags));
        }
        if (editCourseInfo.benefits !== info.benefits) {
          formData.append("whatYouWillLearn", info.benefits);
        }
        if (editCourseInfo.thumbnail !== image) {
          formData.append("thumbnail", image);
        }
        formData.append("token", token);

        const result = await axios.post(`${url}/editCourse`, formData);
        if (result.data.success) {
          toast.success("Course details updated successfully ");
          dispatch(seteditCourseInfo(result.data.course));
          dispatch(setStep(2));
        }
        else{
          toast.error("Error in saving changes");
        }
        
        
    }
    catch(err){
      console.log(err);
      toast.error("Error in updating course details");
    }
    toast.dismiss(toastId);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    
    if (editCourse) {
      handleEditCourse();
      return;
    }
    
    if (
      !info.courseName ||
      !info.courseDescription ||
      !info.benefits ||
      !info.price ||
      !info.tag.length ||
      !image ||
      !info.categoryId ||
      !info.courselevel ||
      !info.courseLanguage
    ) {
      toast.error("All fields are required ");

      return;
    }
    const toastId=toast.loading("...Creating your course");
    try {
      

      var form = new FormData();
      Object.entries(info).forEach(([key, value]) => {
        if (key !== "tag") form.append(key, value);
      });
      form.append("tag", JSON.stringify(info.tag));
      form.append("thumbnail", image);
      form.append("token", token);
      

      const result = await axios.post(`${url}/createCourse`, form);
      
      if (result.data.success) {
        toast.success("Course details added successfully ");
        dispatch(seteditCourseInfo(result.data.data));
        dispatch(setStep(2));
      }
      else{
        toast.error(result?.data?.message || "Image size is too large.");
      }

      
    } catch (err) {
      console.log(err);
      toast.error("Error in adding course details");
      console.log("Error in creating course");
    }
    toast.dismiss(toastId); 

  };
  return (
    <div className="w-full">
      <form
        onSubmit={handlesubmit}
        className="flex flex-col gap-8 mt-16 bg-richblack-800 md:p-8 p-4 rounded-lg "
      >
        <div className="flex flex-col gap-1">
          <label>Course Title</label>
          <input
            onChange={handlechange}
            name="courseName"
            value={info?.courseName}
            type="text"
            placeholder="Enter Course Title"
            className=" h-[45px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label>Course Description</label>
          <textarea
            type="textarea"
            value={info?.courseDescription}
            onChange={handlechange}
            name="courseDescription"
            placeholder="Enter Course Description"
            className=" resize-x-none min-h-[130px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1 relative ">
          <label>Course Price</label>

          <IoCloudUploadOutline
            size={"25px"}
            className="h-[45px]  text-richblack-300 absolute  box-border translate-y-[30px] translate-x-2 "
          />
          <input
            onChange={handlechange}
            name="price"
            value={info?.price}
            type="number"
            placeholder="Enter Course Price"
            className="h-[45px] px-[50px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></input>
        </div>

        <div className="flex flex-col gap-1 w-full ">
          <label>Thumbnail of Course</label>
          <div
            {...getRootProps()}
            className="bg-richblack-700  min-h-[200px] flex flex-col items-center gap-4 justify-center rounded-md p-4 text-richblack-300 "
          >
            {thumbnail ? (
              <div className="flex flex-col gap-2 items-center w-[90%]">
                <img src={thumbnail} className="w-full max-h-[300px]"></img>
                <div
                  className="p-1"
                  onClick={() => {
                    setthumbnail(null);
                  }}
                >
                  Cancel{" "}
                </div>
              </div>
            ) : (
              <div>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex flex-col items-center justify-center">
                    <p>Drop the files here ...</p>
                    <IoCloudUploadOutline
                      color="yellow"
                      size={"20px"}
                      className="bg-black rounded-full w-[50px] h-[50px] p-2 aspect-square "
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                    <IoCloudUploadOutline
                      color="yellow"
                      size={"20px"}
                      className="bg-black rounded-full w-[50px] h-[50px] p-2 aspect-square "
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>Course Category</label>
          <select
            value={info?.categoryId}
            onChange={handlechange}
            name="categoryId"
            data-gtm-form-interact-field-id="3"
            type="text"
            placeholder="Enter Course Category"
            className="h-[45px]  flex flex-col gap-2 shadow-sm shadow-richblack-400 p-2 py-[15px] rounded-md  bg-richblack-700"
          >
            {" "}
            {categories?.map((category, index) => {
              return (
                <option
                  key={index}
                  value={category?._id}
                  className="form-style p-2 bg-richblack-700 "
                >
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Course Level</label>
          <select
            value={info?.courselevel}
            onChange={handlechange}
            name="courselevel"
            type="text"
            placeholder="Enter Course Level"
            className="h-[45px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          >
            <option value="All">All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Course Language</label>
          <select
            onChange={handlechange}
            value={info?.courseLanguage}
            name="courseLanguage"
            type="text"
            placeholder="Enter Course Language"
            className="h-[45px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>
        <TagInput tags={tags} settags={settags} setinfo={setinfo} />
        <div className=" flex flex-col gap-1">
          <label>Benefits of Course</label>
          <textarea
            value={info?.benefits}
            onChange={handlechange}
            name="benefits"
            type="textarea"
            placeholder="Enter Benefits of course"
            className=" resize-x-none min-h-[130px] shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
          ></textarea>
        </div>
        <div className="w-full  flex justify-end gap-4">
          {editCourse && (
            <button
              onClick={() => {
                dispatch(setStep(2));
              }}
              className="bg-richblack-700 text-white p-2 px-4  hover:scale-105 transition-all duration-700 rounded-md  flex items-center "
            >
              Continue without saving
            </button>
          )}
          <button
            name="submitbtn"
            type="submit"
            className="bg-yellow-200 p-2 px-4 text-black hover:scale-105 transition-all duration-700 rounded-md  flex items-center "
          >
            {isformUpdated()?"Save":"Next"} 
            <GrFormNextLink className="inline  " size={"25px"} />
          </button>
        </div>
      </form>
    </div>
  );
}

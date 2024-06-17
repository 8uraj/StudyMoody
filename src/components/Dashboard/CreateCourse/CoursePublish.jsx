import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { setStep } from "../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function CoursePublish() {
  const { register, handleSubmit, setValues, getValues } = useForm();
  const dispatch = useDispatch();
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { editCourseInfo } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(false);

  const onSubmit = async() => {
    if (
      (editCourseInfo.status === "Published" && getValues("public") === true) ||
      (editCourseInfo.status === "Draft" && getValues("public") === false)
    ) {
      navigate("/dashboard/my-courses");
      return;
    }
    setloading(true);
    try{
            const formData = new FormData();
            formData.append("courseId", editCourseInfo._id);
            const status = getValues("public") ? "Published" : "Draft";
            formData.append("status", status);
            formData.append("token", token);

            const result = await axios.post(`${url}/editCourse`, formData);
            console.log(result);
            if (result.data.success) {
              toast.success("Changes saved successfully ");
               setloading(false);
               navigate("/dashboard/my-courses");
            }
            else{
              toast.error("Error in saving changes");
            }
    }
    catch(err){
      console.log(err);
       toast.error("Error in saving changes");
    }
      setloading(false);
   

  };
  return (
    <div className="rounded-md border-[1px] my-12 bg-richblack-800 p-6 border-richblack-700 ">
      <p className="text-[1.4rem] mb-4 font-semibold " >Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center" >
          <label className="mr-1" >Make this course as Public</label>
          <input
            {...register("public")}
            className="w-[30px] "
            id="public"
            type="checkbox"
            
          ></input>
        </div>
        <div className="flex justify-end gap-x-3">
          <IconBtn disabled={loading} onClick={() => dispatch(setStep(2))}>
            Back
          </IconBtn>
          <IconBtn disabled={loading} active>
            {loading ? "...Saving changes" : "Save Changes"}
          </IconBtn>
        </div>
      </form>
    </div>
  );
}

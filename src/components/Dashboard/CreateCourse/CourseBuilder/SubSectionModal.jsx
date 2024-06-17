import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { GiCrossMark, GiLaserBurst } from "react-icons/gi";
import toast from "react-hot-toast";
import axios from "axios";
import { seteditCourseInfo } from "../../../../slices/courseSlice";
import Upload from "../Upload";
import IconBtn from "../../../common/IconBtn";
export default function SubSectionModal({
  modalData,
  setmodalData,
  view = false,
  add = false,
  edit = false,
}) {
  const dispatch = useDispatch();
  const {token}=useSelector((state)=>state.auth);
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [loading, setloading] = useState(false);
  const { editCourseInfo } = useSelector((state) => state.course);
  const [title, settitle] = useState("");
  const [video, setvideo] = useState(null);
  const [description, setdescription] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  useEffect(() => {
    if (view || edit) {
      setValue("title", modalData.title);
      setValue("video", modalData.videoUrl);
      setValue("description", modalData.description);
    }
  }, []);
  const isformUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.title !== modalData.title ||
      currentValues.video !== modalData.videoUrl ||
      currentValues.description !== modalData.description
    ) {
      return true;
    }
    return false;
  };
  const handleEditsubsection = async () => {
    const formData = new FormData();
    const currentValues = getValues();
    
    formData.append("SectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    formData.append("courseId", editCourseInfo._id);
formData.append("token", token);
    if (currentValues.title !== modalData.title) {
      formData.append("title", currentValues.title);
    }
    if (currentValues.video !== modalData.videoUrl) {
      formData.append("video", currentValues.video);
    }
    if (currentValues.description !== modalData.description) {
      formData.append("description", currentValues.description);
    }

    try {
      setloading(true);
      const result = await axios.post(`${url}/updateSubSection`, 
        formData
      );
      
      if (result.data.success) {
        toast.success("Lecture updated successfully");
        dispatch(seteditCourseInfo(result.data.course));
        setmodalData(null);
      }
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (view) {
      return;
    }

    if (edit) {
      if (!isformUpdated) {
        toast.error("No changes made to lecture");
        return;
      }
      handleEditsubsection();
      return;
    }

    const currentValues = getValues();
    
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", currentValues.title);
    formData.append("video", currentValues.video);
    formData.append("courseId", editCourseInfo._id);
    formData.append("token", token);
    formData.append("description", currentValues.description);
    if (
      !currentValues.title ||
      !currentValues.video ||
      !currentValues.description
    ){
      toast.error("All fields are compulsary");
      return;
    }
      try {
        setloading(true);
        const result = await axios.post(`${url}/createSubSection`, formData);
        if (result.data.success) {
          toast.success("Lecture added successfully");

          dispatch(seteditCourseInfo(result.data.course));
          setmodalData(null);
        }
      } catch (err) {
        console.log(err);
      }
    setloading(false);
  };
  return (
    <div className="fixed  inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="border-[1px] border-richblack-500 rounded-lg">
        <div className=" flex justify-between items-center h-[45px] bg-richblack-700 p-2">
          <div>
            {add
              ? "Adding Lecture"
              : view
              ? "Viewing Lecture"
              : "Editing Lecture"}
          </div>
          <div onClick={() => setmodalData(null)}>
            <GiCrossMark color="red" size={"25px"}  />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-richblack-800 p-4 lg:min-w-[500px]  flex flex-col gap-4 "
        >
          <Upload
            name="video"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div className="flex flex-col gap-1">
            <label>
              Lecture Title <sup className="text-pink-300 ">*</sup>{" "}
            </label>
            <input
              id="title"
              placeholder="Enter lecture title"
              {...register("title", { required: true })}
              className="w-full  rounded-md p-2 bg-richblack-700 "
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label>
              Lecture Description <sup className="text-pink-300 ">*</sup>{" "}
            </label>
            <textarea
              id="description"
              placeholder="Enter lecture description"
              {...register("description", { required: true })}
              className="w-full min-h-[130px] rounded-md p-2 bg-richblack-700 "
            ></textarea>
          </div>
          {!view && (
            <div className="flex justify-end">
              {loading ? (
                <IconBtn
                  text="...Loading"
                  
                  active
                />
              ) : (
                <IconBtn
                  text="Save"
                  type="submit"
                  active
                />
              )}
              
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

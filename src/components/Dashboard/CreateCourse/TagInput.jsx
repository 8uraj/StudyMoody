import React, { useEffect, useState } from "react";
import { seteditCourse } from "../../../slices/courseSlice";
import { seteditCourseInfo } from "../../../slices/courseSlice";
import { useSelector } from "react-redux";
export default function TagInput({ tags, settags, setinfo }) {
    const {editCourseInfo}=useSelector((state)=>state.course);
      const { editCourse } = useSelector((state) => state.course);
    useEffect(()=>{
        if(editCourse){
            settags(editCourseInfo?.tag);
        }
    },[])
  const handleaddtag = (e) => {
    if (e.keyCode === 13 || e.key==="Enter") {
      e.preventDefault();
      let val = e.target.value;
      if (!tags || !tags?.includes(val)) {
        const newtags=[...tags,val];
        settags(newtags);
      }
      e.target.value = "";

      setinfo((prev) => {
        return {
          ...prev,
          tag: tags,
        };
      });
      settagchange("");
    }
  };
  const removetag = (e) => {
    var val = e.target.getAttribute("value");

    var array = tags.filter((tag) => {
      return val !== tag;
    });
    settags(array);
  };
  const handletagchange = (e) => {
    settagchange(e.target.value);
  };
  const [tagchange, settagchange] = useState("");
  return (
    <div className=" flex flex-col gap-1 my-2 ">
      <label>Course Tags</label>
      <div className="flex flex-wrap gap-2 ">
        {tags?.map((tag, index) => (
          <div
            key={index}
            className="text-black p-1 my-2 min-w-[50px] text-center px-2 bg-yellow-100 rounded-full flex  items-center justify-center"
          >
            {" "}
            <span className="w-full">{tag}</span>{" "}
            <span
              onClick={removetag}
              value={tag}
              className="hover:cursor-pointer mx-1 w-[20px] flex justify-center items-center"
            >
              x
            </span>
          </div>
        ))}
      </div>
      <input
        onChange={handletagchange}
        type="text"
        value={tagchange}
        name="addtag"
        onKeyDown={handleaddtag}
        placeholder="Enter Tag and press Enter"
        className="shadow-sm shadow-richblack-400 p-2 rounded-md  bg-richblack-700"
      ></input>
    </div>
  );
}

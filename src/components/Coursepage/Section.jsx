import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import  convertSecondsToDuration from "../../utils/setToDuration";
import { FaVideo } from "react-icons/fa6";
export default function Section({ section,setactive }) {
  const [open, setopen] = useState(false);
  const contentRef=useRef();
  const [height,setheight]=useState("0px");
 useEffect(() => {
   if (contentRef.current) {
     setheight(open ? `${contentRef.current.scrollHeight}px` : "0px");
   }
 }, [open]);
  const changeopen = () => {
    setopen(!open);
  };
  return (
    <>
      <div
        onClick={changeopen}
        className=" flex justify-between m-auto  border-b-[1px]  w-full md:w-[95%] items-center border-richblack-700 p-1 md:p-6 border-b-w-[80%] "
      >
        <div className="font-bold text-[1.1rem]">{section?.sectionName}</div>

        <div className="flex gap-x-3 items-center text-yellow-50">
          {section?.subSection.length} lecture (s)
          <IoIosArrowUp
            className={` ${
              !open ? "rotate-180" : ""
            } transition-all duration-700  `}
          />
        </div>
      </div>
      <div
        ref={contentRef}
        style={{
          height: height,
          transition: "height 0.6s ease",
        }}
        className={`  duration-700 bg-richblack-800 w-full md:w-[95%] m-auto rounded-sm   overflow-hidden transition-all  `}
      >
        {section?.subSection?.map((subsection, index) => {
          return (
            <div
              id={index}
              className=" hover:bg-richblack-700 flex justify-between md:px-4 px-1 border-b-[1px] border-richblack-600  "
            >
              <div className="p-4 flex items-center w-[90%] ">
                <div>
                  <FaVideo className="inline mr-4 w-[20px] " size={"20px"} />
                </div>
                <div> {subsection.title} </div>
              </div>
              <div className="text-yellow-50  flex items-center w-[10%] min-w-[60px]">
                {convertSecondsToDuration(subsection.timeDuration)}
                {/* {subsection.timeDuration} hours{" "} */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

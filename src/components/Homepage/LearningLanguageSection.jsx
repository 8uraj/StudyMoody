import React from "react";
import HighlightText from "./HighlightText";
import Know_your_progress from "../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../assets/Images/Plan_your_lessons.png";
export default function LearningLanguageSection() {
  return (
    <div className="w-full my-5 flex flex-col items-center">
      <div className="px-5 text-[2.5rem]  font-semibold my-4 text-center">
        Your Swiss Knife for{" "}
        <HighlightText>learning any language</HighlightText>{" "}
      </div>
      <div className="text-richblack-800 p-2 w-[90%] text-center">
        Using spin making learning multiple languages easy. with 20+ languages
        realistic voice-over, progress tracking, custom schedule and more.
      </div>
      <div className="flex  my-10  mx-auto w-full flex-wrap lg:flex-nowrap lg:pl-20">
        <div className=" lg:relative flex flex-wrap m-auto lg:left-[0px] justify-start  ">
          <img src={Know_your_progress} className="  w-full min-w-[200px] md:min-w-[300px]"></img>
        </div>
        <div className=" lg:relative flex flex-wrap m-auto lg:right-[100px]  ">
          {" "}
          <img src={Compare_with_others} className="  w-full  min-w-[200px] md:min-w-[300px]"></img>
        </div>
        <div className=" lg:relative flex flex-wrap m-auto lg:right-[200px]  ">
          {" "}
          <img src={Plan_your_lessons} className=" w-full min-w-[300px]   md:min-w-[300px]"></img>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import logo from "../../assets/Logo/rzp_logo.png";
import image from "../../assets/Images/TimelineImage.png";
import logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../assets/TimeLineLogo/Logo4.svg";
export default function () {
  return (
    <div className="w-full md:w-[90%] m-auto p-4 flex justify-center gap-5 flex-wrap  my-10">
      <div className="w-[40%] flex flex-col gap-4 px-6 min-w-[350px]">
        <div className="flex gap-4">
          <img src={logo1} className="w-[2rem] rounded-full"></img>
          <div>
            <p className="font-semibold">Leardeship</p>
            <p>Fully committed to the success company</p>
          </div>
        </div>
        <div className="flex gap-4">
          <img src={logo2} className="w-[2rem] rounded-full"></img>
          <div>
            <p className="font-semibold">Responsibility</p>
            <p>Students will always be our top priority</p>
          </div>
        </div>
        <div className="flex gap-4">
          <img src={logo3} className="w-[2rem] rounded-full"></img>
          <div>
            <p className="font-semibold">Flexibility</p>
            <p>The ability to switch is an important skill</p>
          </div>
        </div>
        <div className="flex gap-4">
          <img src={logo4} className="w-[2rem] rounded-full"></img>
          <div>
            <p className="font-semibold">Solve the problem</p>
            <p>Code your way to a solution</p>
          </div>
        </div>
      </div>

      <div className="md:w-[50%] text-center min-w-[350px] w-full justify-start items-center flex flex-col md:mx-5 ">
        <img
          src={image}
          className="max-w-[600px] min-w-[200px]  md:min-w-[450px]  shadow-lg shadow-blue-200 w-[90%] mx-auto md:m-0"
        ></img>
        <div className="bg-yellow-25 px-2 lg:w-[70%] lg:flex lg:left-0 min-h-[100px] max-h-[100px] w-full items-center md:relative lg:bottom-10 md:w-[70%] justify-around
          hidden ">
          <div className="font-semibold text-2xl ">10</div>
          <div>YEARS OF EXPERIENCE</div>
          <div className="font-semibold text-2xl ">250</div>
          <div>TYPE OF COURSES</div>
        </div>
      </div>
    </div>
  );
}

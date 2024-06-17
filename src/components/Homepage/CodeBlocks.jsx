import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
export default function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div
      className={`flex ${position} my-10 justify-center gap-10 w-[70%] mx-auto flex-wrap lg:flex-nowrap md:flex-nowrap`}
    >
      <div className="w-[70%] flex flex-col  gap-8 min-w-[300px] ">
        {heading}
        <div className="text-richblack-300 font-bold"> {subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight className="flex justify-center align-middle" />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {" "}
            <div className="flex gap-2 items-center">{ctabtn2.btnText}</div>
          </CTAButton>
        </div>
      </div>
      <div
        className="flex  bg-center  h-fit flex-row  text-[14px] py-5  lg:w-[800px] min-w-[300px]  shadow-md shadow-richblack-500    "
       
      >
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold text-[12px] ">
          <p className="  ">1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
          <p>15</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-[12px] ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}

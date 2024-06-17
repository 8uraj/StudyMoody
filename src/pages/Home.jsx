import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTAButton from "../components/Homepage/Button";
import CodeBlocks from "../components/Homepage/CodeBlocks";
import banner from "../assets/Images/banner.mp4";
import Footer from "../components/Homepage/Footer";
import HighlightText from "../components/Homepage/HighlightText";
import HighlightTextPurple from "../components/Homepage/HighlightTextPurple";
import TimeLineSection from "../components/Homepage/TimeLineSection";
import LearningLanguageSection from "../components/Homepage/LearningLanguageSection";
import instructor from "../assets/Images/Instructor.png";
import ExploreMore from "../components/Homepage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import { useSelector } from "react-redux";

export default function Home() {
   const {token}=useSelector((state)=>state.auth);
   const{user}=useSelector((state)=>state.profile);
   
  return (
    <div className="mt-4 relative flex flex-col mx-auto w-full justify-center align-middle items-center text-white">
      {/* section one */}
      <Link to={"/signup"}>
        <div className="hover:bg-richblack-900 mt-16 p-2 group w-fit justify-center text-center mx-auto flex rounded-full font-bold bg-richblack-800 text-richblack-200 transition-all duration-200 hover:scale-95 px-6 my-3">
          <div className="flex items-center">
            <p className="mx-1">Became an Instructor </p>{" "}
            <FaArrowRight
              color="white"
              className="flex justify-center align-middle"
            />
          </div>
        </div>
      </Link>
      <div className="text-4xl text-center font-semibold my-3 p-5">
        Empower Your Future With <HighlightText>Coding Skills</HighlightText>
      </div>

      <div className="w-[80%] text-center p-1 my-2 text-lg font-bold text-richblack-300">
        {" "}
        With our online coding courses, you can leart at your own pace , from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on project,quizzes,and personalized feedback from
        instructors.
      </div>
      <div className="flex gap-7 mt-8 ">
        <CTAButton active linkto={"/about"}>
          Learn More
        </CTAButton>
        <CTAButton linkto={"/Contact"}>Book a Demo</CTAButton>
      </div>

      {/* section 2 */}
      <div className="shadow-lg shadow-blue-200  my-12 w-[90%] md:w-[70%]  ">
        <video muted loop autoPlay src={banner}></video>
      </div>
      <div>
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              unlock your <HighlightText>Coding Potential </HighlightText>
              with our online courses
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={{
            btnText: "Try it Yourself",
            linkto: `${user && token ? "/dashboard/my-profile" : "/login"}`,
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/about",
            active: false,
          }}
          codeblock={`import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTAButton from "../components/Homepage/Button";
import CodeBlocks from "../components/Homepage/CodeBlocks";
import banner from "../assets/Images/banner.mp4"<!doctype html>\n<html lang='en'>\n<head>\n<meta charset='UTF-8'/>\n<link rel='icon' type='image/svg+xml' href='/vite.svg'/>\n<meta  content='width=device-width, initial-scale=1.0' />\n<title>StudyNotion</title>`}
          codeColor={"text-yellow-25"}
        />
      </div>
      <div>
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold">
              Start <HighlightText>coding in seconds</HighlightText>{" "}
            </div>
          }
          subheading={
            "Go ahead and give it a try. Our hands-on learning environment means you'll writing read code from your very first lessons."
          }
          ctabtn1={{
            btnText: "Continue Lesson",
            linkto: `${user && token ? "/dashboard/my-profile" : "/login"}`,
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/about",
            active: false,
          }}
          codeblock={
            "#include <bits/stdc++.h> \nusing namespace std; \n#include <ext/pb_ds/assoc_container.hpp> \n#include <ext/pb_ds/tree_policy.hpp> \nusing namespace __gnu_pbds; \nint main() \n{ \nios_base::sync_with_stdio(false); \ncin.tie(NULL); \nll t; \ncin >> t; \nwhile (t--) \nsolve();\nreturn 0; \n} "
          }
          codeColor={"text-yellow-25"}
        />
      </div>

      {/* section 2  */}

      <ExploreMore></ExploreMore>
      <div className="w-full bg-pure-greys-5 text-richblack-700  ">
        <div className="flex w-full justify-center gap-4 lg:pt-56  home_bg py-16 ">
          <CTAButton
            linkto={`${user && token ? "/dashboard/my-profile" : "/login"}`}
            active
          >
            <p>
              Explore Full Catlog{" "}
              <FaArrowRight color="black" className="inline" />
            </p>
          </CTAButton>
          <CTAButton linkto={"/about"}>Learn More </CTAButton>
        </div>

        <div className="flex my-14  justify-center lg:justify-between md:justify-center md:px-24 min-h-[150px] flex-wrap gap-10 ">
          <div className="md:w-[80%] lg:w-[50%] w-full text-[2rem] font-semibold min-w-[350px] text-center p-2">
            Get the skills your need for a{" "}
            <HighlightTextPurple>Job that is in demand </HighlightTextPurple>{" "}
          </div>
          <div className=" p-2 md:w-[80%] lg:w-[40%] w-[90%] text-center gap-6 items-center lg:items-start  flex flex-col justify-between min-w-[200px]">
            <div>
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </div>
            <div className="w-[30%] min-w-[120px]">
              <CTAButton active linkto={"/about"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        {/* secion 2 photo leadership */}
        <TimeLineSection></TimeLineSection>
        <LearningLanguageSection></LearningLanguageSection>
      </div>
      {/* section 3 */}
      <div className="flex w-full justify-center md:justify-between items-center flex-wrap my-20 p-10">
        <div className="md:w-1/2 w-full min-w-[280px] p-5 items-center flex  ">
          <img
            src={instructor}
            className="m-auto min-w-[200px] shadow-2xl shadow-blue-100"
          ></img>
        </div>

        <div className="md:w-1/2 flex flex-col gap-10   px-5 items-center">
          <div className="text-[2.5rem] font-semibold">
            <p className="p-0">Became an</p>
            <HighlightText>Instructor</HighlightText>
          </div>
          <div className="px-6 text-center">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>
          <CTAButton
            active
            linkto={`${user && token ? "/dashboard/my-profile" : "/signup"}`}
            className=""
          >
            Start Learning Today{" "}
            <FaArrowRight className="inline"></FaArrowRight>{" "}
          </CTAButton>
        </div>
        <ReviewSlider className="m-auto w-full text-center md:text-start "></ReviewSlider>
      </div>
      <Footer></Footer>
    </div>
  );
}

import axios from "axios";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RatingStars from "../components/Catalogpage/RatingStars";
import GetAvgRating from "../utils/GetAvgRating";
import Button from "../components/Homepage/Button";
import { FaShareSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Homepage/Footer";
import { IoIosPerson } from "react-icons/io";
import Section from "../components/Coursepage/Section";
import CourseReviewSlider from "../components/Coursepage/CourseReviewSlider";
import CourseSlider from "../components/Catalogpage/CourseSlider";
import toast from "react-hot-toast";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import { formatDate } from "../services/formatDate";
import copy from "copy-to-clipboard";
import { setTotalItems } from "../slices/cartSlice";

export default function Course() {
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.profile);
  // const {paymentLoading}=useSelector((state)=>state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseinfo, setcourseinfo] = useState(null);
  const [totalNoOfLectures, settotalNoOfLectures] = useState(0);
  const [othercourses, setothercourses] = useState(null);
  var { courseId } = useParams();
  useEffect(() => {
    try {
      (async () => {
        if (courseId) {
          const result = await axios.post(`${url}/getCourseDetails`, {
            courseId,
          });

          setcourseinfo(result.data.data);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [courseId]);

  useEffect(() => {
    try {
      (async () => {
        const result = await axios.get(`${url}/getAllCourses`);
        setothercourses(result.data.allCourses);
      })();
    } catch (err) {
      console.log(err);
    }

    let total_lectures = 0;
    courseinfo?.courseContent?.forEach((sec) => {
      total_lectures += sec?.subSection?.length || 0;
    });
    settotalNoOfLectures(total_lectures);
  }, [courseinfo]);

  const handlebuycourse = async () => {
    if (token !== null) {
      if (user.accountType !== "Student") {
        toast.error("Only students can buy the Course");
        return;
      }
      if (user?.courses.includes(courseId)) {
        toast.error("You have already bought this course");
        return;
      }

      buyCourse(token, [courseId], user, navigate, dispatch);

      return;
    } else {
      toast.error("You are not logged in ");
    }
  };

  const Addtocart = async () => {
    if (!user) {
      toast.error("You are not logged in");

      return;
    }
    if (user?.accountType !== "Student") {
      toast.error("Only students can add course to cart");
      return;
    }
    if (user?.courses.includes(courseId)) {
      toast.error("You have already bought this course");
      return;
    }
    try {
      const result = await axios.post(`${url}/cart/addtocart`, {
        courseId,
        token,
      });
      if (result.data.success) {
        dispatch(setTotalItems(totalItems + 1));
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const shareCourse = async () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });

  return (
    <div className="text-white w-full mt-10 md:mt-4  ">
      {/* section 1 */}
      <div className="w-full  flex justify-around  bg-richblack-800 md:p-10 p-6 gap-6 lg:h-[450px]  flex-wrap ">
        <div className="flex flex-col gap-4 w-full md:w-[55%] md:p-10 h-fit ">
          <div className="text-[1.7rem] md:text-[2rem] font-semibold">
            {courseinfo?.courseName}
          </div>
          <div className="text-richblack-300 text-[1.2rem]">
            {courseinfo?.courseDescription}
          </div>
          <div className="flex gap-4 text-[1rem] flex-wrap">
            <RatingStars
              Review_Count={GetAvgRating(courseinfo?.ratingAndReviews)}
            />
            <span className="text-yellow-50">
              Total Reviews : {courseinfo?.ratingAndReviews?.length}{" "}
            </span>

            <span>
              {courseinfo?.studentsEnrolled?.length
                ? courseinfo?.studentsEnrolled?.length
                : 0}{" "}
              Students Enrolled
            </span>
          </div>
          <div className="text-[1.1rem]">
            Created By :{" "}
            {courseinfo?.Instructor.firstName +
              " " +
              courseinfo?.Instructor.lastName}
          </div>
          {courseinfo?.createdAt && (
            <div>Created at : {formatDate(courseinfo?.createdAt)} </div>
          )}
        </div>

        <div className="lg:mt-[30px] mt-[10px] md:relative  w-full md:w-[30%] md:p-8 p-4 md:min-w-[350px] max-w-[350px] flex flex-col h-fit  gap-4  text-center bg-richblack-700">
          <img
            src={courseinfo?.thumbnail}
            className="md:h-[250px]  w-full object-center m-auto max-w-[250px] lg:max-w-[1000px]"
          ></img>
          <div className="text-[2rem] md:text-start font-semibold ">
            Rs.{courseinfo?.price}
          </div>

          <div
            className="hover:cursor-pointer w-full text-[17px] bg-yellow-100 p-3 rounded-md text-black"
            onClick={handlebuycourse}
          >
            Buy Now
          </div>
          <div
            onClick={Addtocart}
            className="hover:cursor-pointer w-full text-[17px] bg-richblack-800 p-3 rounded-md text-white"
          >
            Add to cart
          </div>

          <div className="text-caribbeangreen-200">
            30 day money back Guarantee
          </div>
          <div
            className="text-yellow-100 hover:cursor-pointer"
            onClick={shareCourse}
          >
            <FaShareSquare className="inline" /> Share
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className="w-[95%] m-auto ">
        <div className="border-[1px] border-solid border-richblack-700 lg:px-20    lg:w-[60%] w-full h-fit mt-4 flex flex-col gap-2 p-6 ">
          <div className="text-[2rem] font-semibold">What will You learn </div>
          <div>{courseinfo?.whatYouWillLearn}</div>
        </div>

        <div className="   text-center md:text-start  lg:px-20    lg:w-[60%] w-full h-fit mt-4 flex flex-col gap-2 md:p-6">
          <div className="text-[2rem] font-semibold  ">Course Content</div>
          <div className="">
            {" "}
            {courseinfo?.courseContent?.length} sections {totalNoOfLectures}{" "}
            lectures{" "}
          </div>
          {courseinfo?.courseContent?.length !== 0 ? (
            <div className=" w-full flex flex-col gap-2   mt-4 p-4 border-richblack-800 border-[1px]   ">
              {courseinfo?.courseContent?.map((section, index) => {
                return <Section id={index} section={section} />;
              })}
            </div>
          ) : (
            <div>No Lectures found</div>
          )}
        </div>
      </div>
      {/* section 3  */}
      <div className=" text-center md:text-start lg:px-28    lg:w-[60%] w-full h-fit mt-4 flex flex-col gap-2 p-6 ">
        <div className="text-[1.9rem] font-semibold">Author </div>
        <div className="text-caribbeangreen-200 text-[1.2rem] ">
          <IoIosPerson className="inline mr-1" color="white" />
          {courseinfo?.Instructor?.firstName.slice(0, 1).toUpperCase() +
            courseinfo?.Instructor?.firstName.slice(1) +
            " " +
            courseinfo?.Instructor?.lastName.slice(0, 1).toUpperCase() +
            courseinfo?.Instructor?.lastName.slice(1)}
        </div>
        <div>{courseinfo?.Instructor?.additionalDetails?.about} </div>
      </div>

      {/* section 4 reviews about course */}
      <div className="w-full md:w-[95%] m-auto text-center">
        <CourseReviewSlider reviews={courseinfo?.ratingAndReviews} />
      </div>
      {/* section 5 other courses */}
      <div className="w-full md:w-[95%] m-auto text-center mb-12 p-8  ">
        <div className="text-[1.8rem] font-semibold my-4 ">
          Other Courses by{" "}
          {courseinfo?.Instructor?.firstName.slice(0, 1).toUpperCase() +
            courseinfo?.Instructor?.firstName.slice(1) +
            " " +
            courseinfo?.Instructor?.lastName.slice(0, 1).toUpperCase() +
            courseinfo?.Instructor?.lastName.slice(1)}
        </div>
        <CourseSlider Courses={othercourses} />
      </div>
      <Footer></Footer>
    </div>
  );
}

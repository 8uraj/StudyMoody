import React, { useState } from 'react'
import { FaEarthAmericas } from "react-icons/fa6";
import { TbPhoneCall } from "react-icons/tb";
import { IoMdChatbubbles } from "react-icons/io";
import HighlightText from '../components/Homepage/HighlightText';
import Footer from '../components/Homepage/Footer';
import ReviewSlider from '../components/common/ReviewSlider';
export default function Contact() {
    const [info, setinfo] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone:"",
      message:"",
      
    });
    function handlechange(e) {
      const term = e.target.name ;
      const newval = e.target.value ;

      setinfo((prev) => {
        return {
          ...prev,
          [term]: newval,
        };
      });
      console.log(info);
    }
  return (
    <div className="text-white flex justify-around mt-20    flex-wrap gap-20 md:gap-0 ">
      <div className="w-[90%] h-fit md:min-w-[450px] md:w-[30%] flex flex-col gap-4 p-6 bg-richblack-800 rounded-xl text-richblack-100 ">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4 items-center text-richblack-300 ">
            {" "}
            <span className="inline h-full">
              <IoMdChatbubbles size={"25px"} />
            </span>
            <p className="text-[1.3rem] font-semibold text-white">Chat on us</p>
          </div>
          <div>Our friendly team is here to help.</div>
          <div className="font-semibold text-richblack-400 ">
            info@studynotion.com
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-4 items-center ">
            {" "}
            <span className="inline h-full">
              <FaEarthAmericas size={"20px"} className="text-richblack-300" />
            </span>
            <p className="text-[1.3rem] font-semibold text-white">Visit us</p>
          </div>
          <div>Come and say hello at our office HQ.</div>
          <div className="font-semibold text-richblack-400 ">
            Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-4 items-center text-richblack-300 ">
            {" "}
            <span className="inline h-full">
              <TbPhoneCall size={"25px"} className="text-blue-100" />
            </span>
            <p className="text-[1.3rem] font-semibold text-white">Call us</p>
          </div>
          <div>Mon - Fri From 8am to 5pm</div>
          <div className="font-semibold text-richblack-400">+123 456 7869</div>
        </div>
      </div>

      <div className="w-[90%] lg:w-[50%] md:w-[60%] p-4 md:p-14 flex flex-col gap-4 border-[1px] border-richblack-700 shadow-sm shadow-richblack-200 rounded-sm ">
        <div className="w-full text-center md:text-start text-[2rem]">
          <HighlightText className="bg-richblack-5">
            Got a Idea? We've got the skills. Let's team up
          </HighlightText>
        </div>
        <div className="text-richblack-200">
          Tell us more about yourself and what you're got in mind.
        </div>
        <form className="flex flex-col gap-4 w-full">
          <div className="flex my-2 justify-between">
            <div className="w-[45%] flex flex-col gap-2">
              <label>First Name</label>
              <input
                name="firstName"
                value={info.firstName}
                onChange={handlechange}
                type="text"
                className="w-full bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
                placeholder="Enter first name"
              ></input>
            </div>
            <div className="w-[45%] flex flex-col gap-2">
              <label>Last Name</label>
              <input
                name="lastName"
                value={info.lastName}
                onChange={handlechange}
                type="text"
                className="w-full bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
                placeholder="Enter last name"
              ></input>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Email Address</label>
            <input
              name="email"
              value={info.email}
              onChange={handlechange}
              type="text"
              className="w-full bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
              placeholder="Enter Email Address"
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label>Phone Number</label>
            <input
              name="phone"
              maxLength="10"
              value={info.phone}
              onChange={handlechange}
              type="Number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
              placeholder="Enter Phone Number"
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label>Message</label>
            <textarea
              name="message"
              value={info.message}
              onChange={handlechange}
              className="w-full  bg-richblack-800 rounded-lg  h-[150px] p-3 text-richblack-50 shadow-sm shadow-blue-200"
              placeholder="Enter Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-yellow-100  h-[45px] rounded-lg text-black text-bold text-lg hover:bg-yellow-50 "
          >
            Send Message
          </button>
        </form>
      </div>
        <ReviewSlider/>
      <Footer></Footer>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/Images/signup.webp";
import HighlightText from "../components/Homepage/HighlightText";
import { FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { CiCircleMinus } from "react-icons/ci";
import { setLoading } from "../slices/authSlice";
import Loading from "./Loading";
import axios from "axios";
// <FaEye />
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setsignupData } from "../slices/authSlice";
import sendOTP from "../components/auth/sendOTP";
export default function Signup() {
  const Navigate = useNavigate();
  const { signupData,loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showvalidation, setshowvalidation] = useState(false);
  const [info, setinfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Student",
  });
  const [valid, setvalid] = useState({
    lower: false,
    upper: false,
    special: false,
    number: false,
    minlen: false,
  });
  const [showpass, setshowpass] = useState(false);
  function hidepassfun() {
    setshowpass(false);
  }
  function showpassfun() {
    setshowpass(true);
  }
  const [showconfirmpass, setshowconfirmpass] = useState(false);
  function hideconfirmpassfun() {
    setshowconfirmpass(false);
  }
  function showconfirmpassfun() {
    setshowconfirmpass(true);
  }
  function handlechange(e) {
    const term = e.target.name || "accountType";
    const newval = e.target.value || e.target.innerHTML;

    setinfo((prev) => {
      return {
        ...prev,
        [term]: newval,
      };
    });

    if (term === "password") {
      setshowvalidation(true);
      const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
      var len = true,
        upper = /[A-Z]/.test(newval),
        lower = /[a-z]/.test(newval),
        special = regex.test(newval),
        number = /\d/.test(newval);
      if (newval.length < 8) {
        len = false;
      }

      setvalid((prev) => {
        return {
          ...prev,
          minlen: len,
          upper: upper,
          lower: lower,
          special: special,
          number: number,
        };
      });
    }
  }

  const handlesubmit = async (event) => {
    event.preventDefault();

   
    dispatch(setsignupData(info));

    
    dispatch(setLoading(true));
    try {
      
      const result= await sendOTP(info?.email);
      console.log( "result in signup is ; ",result);
      if (result?.data?.success) {
        setTimeout(()=>{
            toast.success("OTP sent successfully");
        },200)
        dispatch(setLoading(false));
        Navigate("/verify-email");
      }
      else
      toast.error(result?.data?.message);
    } catch (err) {
      // toast.error(response);
      console.log(err);
    }
    dispatch(setLoading(false));
  };
  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <div className="text-white w-full flex mb-60 md:px-20 px-4 gap-10 md:justify-around justify-center flex-wrap-reverse mt-16">
          <div className="lg:w-[35%] w-[100%] flex flex-col gap-4  min-w-[280px] p-3 md:min-w-[400px] max-w-[500px]">
            <div className="text-[2rem] font-semibold w-full md:w-[100%] text-center lg:text-start">
              Join the millions learning to code with StudyNotion for free
            </div>
            <div className="text-richblack-300 text-center lg:text-start">
              Build skills for today, tomorrow, and beyond.{" "}
              <span className="text-[1.3rem]">
                <HighlightText>
                  {" "}
                  Education to future-proof your career.
                </HighlightText>{" "}
              </span>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
              <div className="bg-richblack-800 justify-between flex items-center w-fit h-fit px-4  gap-5 rounded-full min-w-[280px] ">
                <div
                  onClick={handlechange}
                  name="accountType"
                  value="Student"
                  className={`${
                    info.accountType === "Student"
                      ? "bg-black shadow-sm shadow-blue-100 font-semibold"
                      : ""
                  }  h-[80%] p-4 px-6 flex items-center rounded-full`}
                >
                  Student
                </div>
                <div
                  onClick={handlechange}
                  name="accountType"
                  value="Instructor"
                  className={`${
                    info.accountType !== "Student"
                      ? "bg-black shadow-sm shadow-blue-100 font-semibold"
                      : ""
                  }  h-[80%] p-4 px-6 flex items-center rounded-full`}
                >
                  Instructor
                </div>
              </div>
              <div className="flex my-2 justify-between flex-wrap gap-2">
                <div className="min-w-[250px] w-full md:min-w-0 md:w-[45%] flex flex-col gap-2">
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
                <div className="min-w-[250px] w-full md:min-w-0 md:w-[45%] flex flex-col gap-2">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    value={info.lastName}
                    onChange={handlechange}
                    type="text"
                    className=" w-full bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
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
              <div className="flex flex-col gap-2 h-fit">
                <label>Password</label>
                <input
                  name="password"
                  value={info.password}
                  onChange={handlechange}
                  type={showpass ? "text" : "password"}
                  className="w-full bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
                  placeholder="Enter Password"
                ></input>
                <span className="relative bottom-[38%]  left-[88%] w-[30px]">
                  {showpass ? (
                    <IoIosEyeOff onClick={hidepassfun} size={"25px"} />
                  ) : (
                    <FaEye onClick={showpassfun} size={"25px"} />
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-2 ">
                <label>Confirm Password</label>
                <input
                  name="confirmPassword"
                  value={info.confirmPassword}
                  onChange={handlechange}
                  type={showconfirmpass ? "text" : "password"}
                  className="w-full bg-richblack-800 rounded-lg  h-[45px] p-2 text-richblack-50 shadow-sm shadow-blue-200"
                  placeholder="Confirm Password"
                ></input>
                <span className="relative bottom-[38%]  left-[88%] w-[30px]">
                  {showconfirmpass ? (
                    <IoIosEyeOff onClick={hideconfirmpassfun} size={"25px"} />
                  ) : (
                    <FaEye onClick={showconfirmpassfun} size={"25px"} />
                  )}
                </span>
              </div>
              {showvalidation ? (
                <div className="w-full flex flex-wrap text-[17px] ">
                  <div
                    className={`items-center flex gap-2 min-w-[50%]  ${
                      valid.lower ? "text-caribbeangreen-100" : "text-pink-200"
                    } `}
                  >
                    <span>
                      <CiCircleMinus />
                    </span>
                    one lowercase letter
                  </div>
                  <div
                    className={` items-center flex gap-2 min-w-[50%] ${
                      valid.upper ? "text-caribbeangreen-100" : "text-pink-200"
                    }`}
                  >
                    <span>
                      <CiCircleMinus />
                    </span>
                    one uppercase letter
                  </div>
                  <div
                    className={` items-center flex gap-2 min-w-[50%] ${
                      valid.special
                        ? "text-caribbeangreen-100"
                        : "text-pink-200"
                    }`}
                  >
                    <span>
                      <CiCircleMinus />
                    </span>
                    one special letter
                  </div>
                  <div
                    className={` items-center flex gap-2 min-w-[50%] ${
                      valid.number ? "text-caribbeangreen-100" : "text-pink-200"
                    }`}
                  >
                    <span>
                      <CiCircleMinus />
                    </span>
                    one number{" "}
                  </div>
                  <div
                    className={` items-center flex gap-2 min-w-[50%] ${
                      valid.minlen ? "text-caribbeangreen-100" : "text-pink-200"
                    }`}
                  >
                    <span>
                      <CiCircleMinus />
                    </span>
                    min 8 letters
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <button
                type="submit"
                className="bg-yellow-100  h-[45px] rounded-lg text-black text-lg hover:bg-yellow-50 "
              >
                Create Account
              </button>
            </form>
            <div className="text-blue-100 px-4 ">
              {" "}
              <Link to={"/login"}>Already have an account?</Link>{" "}
            </div>
          </div>
          <div className="p-4 max-w-[500px] min-w-[270px] flex items-center">
            <img src={signupImage}></img>
          </div>

          {/* validation section */}
        </div>
      )}{" "}
    </>
  );
}

import React, { useEffect, useState } from "react";
import Button from "../components/Homepage/Button";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { HiRefresh } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setsignupData } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import sendOTP from "../components/auth/sendOTP";
import { setLoading } from "../slices/authSlice";
import Loading from "./Loading";
export default function VerifyOtp() {
  const dispatch = useDispatch();
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    const data = {
      ...signupData,
      otp,
    };
    dispatch(setLoading(true));
    try {
      const result = await axios.post(`${url}/signup`, data);

      if (result?.data?.success) {
        dispatch(setLoading(false));
        toast.success("Registration successfull");
        navigate("/login");
      } else {
        toast.error(result?.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };

  const resendOTP = async () => {
    try {
      const result = await sendOTP(signupData.email);
      console.log("result in signup is ; ", result);
      if (result?.data?.success) {
        setTimeout(() => {
          toast.success("OTP sent successfully");
        }, 200);
      } else toast.error(result?.data?.message);
    } catch (err) {
      // toast.error(response);
      console.log(err);
    }
  };
  return (
    <>
      {loading ? (
        
        <Loading />
      ) : (
        <div className="text-white w-full  min-w-[280px] m-auto p-4    flex flex-col gap-2">
          <div className=" bg-richblack-900 max-w-[450px] m-auto p-8 flex flex-col gap-4 rounded-lg">
            <div className="text-[2rem] font-semibold">Verify Email</div>
            <div className="text-richblack-200">
              A verification code has been sent to you. Enter the code below.
            </div>

            <form onSubmit={handleVerifyAndSignup}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder=""
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" text-[1.2rem] w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
              <button
                type="submit"
                className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
              >
                Verify Email
              </button>
            </form>

            <div className="flex justify-between text-richblack-400">
              <Link to="/login">
                {" "}
                <FaArrowLeft className="inline" /> Back to login
              </Link>
              <a className="text-blue-200 hover:cursor-pointer " onClick={resendOTP}>
                <HiRefresh className="inline" /> Resend it
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

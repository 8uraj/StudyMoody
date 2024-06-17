import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../slices/profileSlice";
import { getUserDetails } from "../../../services/operations/getUserDetails";

export default function Personal_Info({ user }) {
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const [info, setinfo] = useState({
    dateOfBirth: "",
    about: "",
    gender: "",
    contactNumber: "",
  });
   const { loading } = useSelector((state) => state.profile);
  const handlechange = (e) => {
    const term = e.target.name;
    const val = e.target.value;
    setinfo((prev) => {
      return {
        ...prev,
        [term]: val,
      };
    });
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (info?.contactNumber && info?.contactNumber.length!==10){
      toast.error("Enter 10 digit contact number");
      return;
    }
      try {
        var url = import.meta.env.VITE_REACT_APP_BASE_URL;
        dispatch(setLoading(true));
        const result = await axios.post(
          `${url}/profile/updateProfile`,
          { info, token },
          {
            Authorization: `Bearer ${token}`,
          }
        );

        toast.success("Profile information updated successfully");
        const details = await getUserDetails(token, dispatch);
      } catch (err) {
        toast.error("Error");
        console.log(err);
      }
    
    dispatch(setLoading(false));
  };
  return (
    <div className=" w-full flex flex-wrap justify-center md:justify-start bg-richblack-800 border-[1px] border-richblack-700 p-2 md:p-8 gap-4 my-8 rounded-md">
      <div className="w-full font-semibold text-lg text-center md:text-start ">
        Profile Information
      </div>
      <form className="flex  flex-col md:flex-row w-full flex-wrap gap-4 justify-around p-2 ">
        <div className="md:w-[45%] flex flex-col gap-2">
          <div>Date of Birth</div>
          <input
            value={info.dateOfBirth}
            onChange={handlechange}
            type="Date"
            name="dateOfBirth"
            className="text-white rounded-md p-2 bg-richblack-600"
            placeholder="dd/mm/yyyy"
          ></input>
        </div>
        <div className="md:w-[45%] flex flex-col gap-2">
          <div>Gender</div>

          <select
            value={info.gender}
            onChange={handlechange}
            name="gender"
            className="text-white rounded-md p-3 px-3 bg-richblack-600 flex flex-col gap-1"
          >
            <option className="my-1" value="Female">
              Female
            </option>
            <option className="my-1" value="Female">
              Female
            </option>
            <option className="my-1" selected value="Male">
              Male
            </option>
            <option className="my-1" value="non-binary">
              Non-Binary
            </option>
            <option className="my-1" value="other">
              Other
            </option>
            <option className="my-1" value="Prefer not to answer">
              Perfer not to Answer
            </option>
          </select>
        </div>
        <div className="md:w-[45%] flex flex-col gap-2">
          <div>Contact Number</div>
          <input
            value={info.contactNumber}
            onChange={handlechange}
            type="number"
            name="contactNumber"
            placeholder="Enter contact number"
            className="text-white rounded-md p-2 bg-richblack-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          ></input>
        </div>
        <div className="md:w-[45%] flex flex-col gap-2">
          <div>About</div>
          <input
            onChange={handlechange}
            type="text"
            value={info.about}
            name="about"
            placeholder="About...."
            className="text-white rounded-md p-2 bg-richblack-600"
          ></input>
        </div>
        <div className="w-full justify-center md:justify-end   flex">
          <button
            onClick={handleSubmit}
            type="submit"
            className=" md:relative md:right-5 font-bold bg-yellow-50 text-black p-2 px-6 rounded-md hover:scale-105 duration-700 transition-all"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

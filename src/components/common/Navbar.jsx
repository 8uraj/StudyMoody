import React, { useEffect, useRef, useState } from "react";
import { Link, matchPath, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks as links } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from "../auth/ProfileDropDown";
import { RxCross1 } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlMenu } from "react-icons/sl";

import axios from "axios";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import Logout from "../../services/auth/Logout";

import NavbarMobile from "./NavbarMobile";
import VideoDetailsSidebar from "../ViewCourse/VideoDetailsSidebar";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [show, setshow] = useState(false);
  const location = useLocation();
  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }
  const logoutUser = () => {
    Logout(dispatch, navigate);
  };
  const [sublinks, setsublinks] = useState([]);
  
  const fetchsublinks = async () => {
    try {
      var url = import.meta.env.VITE_REACT_APP_BASE_URL;
      
      
      
      const result = await axios.get(
       `${url}/showallcategories`
      );
     
      setsublinks(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchsublinks();
  }, []);
  return (
    <div className="overflow-y-scroll md:overflow-y-visible fixed z-20 w-full md:max-h-[66px] bg-richblack-900  md:flex  min-h-[50px] md:flex-wrap  items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex p-2 md:p-0 flex-wrap w-11/12 max-w-maxContent items-center justify-between">
        <button
          className={`text-white block md:hidden z-30 ${location.pathname.split('/')[1]==="view-course"?"hidden ":"block"} `}
          onClick={() => setshow(!show)}
        >
          {show ? <RxCross1 size={"25px"} /> : <SlMenu size={"25px"} />}
        </button>
        <Link to="/" className=" md:w-fit">
          <img src={logo} width={160} height={42} loading="lazy"></img>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex flex-wrap gap-x-6 text-richblack-25 ">
            {links?.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="group relative">
                      <p className="flex items-center gap-1 ">
                        {link.title}
                        <IoIosArrowDropdownCircle />
                      </p>

                      <div
                        className="border-[2px] border-black invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-[100%] z-10 w-[300px] text-black
                      translate-x-[-45%] translate-y-[15%] "
                      >
                        <div className="absolute left-[50%] top-1 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-30%]"></div>
                        <div className="flex flex-col gap-1 p-2 text-[17px]">
                          {sublinks?.map((lnk, index) => {
                            return (
                              <Link
                                className=" hover:bg-richblack-50 p-3 rounded-md"
                                key={index}
                                to={`/catalog/${lnk.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                              >
                                {lnk.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link?.path}
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        {/* login / signup /dashboard */}
        <div className=" hidden md:flex gap-x-4 items-center">
          {user && user.accountType != "Instructor" ? (
            <Link to="/dashboard/cart" className=" flex">
              {totalItems && (
                <div className="text-yellow-25 relative transition-all  animate-bounce duration-1000     left-[30px] top-[-10px] text-center px-1  flex  items-center  bg-richblack-700 rounded-full h-[20px] w-[20px]">
                  {totalItems}
                </div>
              )}

              <FaShoppingCart color="white" size={"22px"} />
            </Link>
          ) : (
            <div></div>
          )}

          {token === null && (
            <Link to="/login" className="text-white">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Login
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup" className="text-white">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                signup
              </button>
            </Link>
          )}

          {token !== null && (
            <div className="flex items-center group mx-4 ">
              <div className="flex items-center gap-1">
                <img src={user?.image} className="w-[30px] rounded-full"></img>
                <IoMdArrowDropdown color="white" className="inline" />
              </div>

              <div className=" opacity-80 transition-all duration-200 z-10 invisible group-hover:visible hover:visible translate-x-[-20%] translate-y-[-10%]">
                <ProfileDropDown />
              </div>
            </div>
          )}
        </div>
        <nav className={`inline-block lg:hidden md:hidden  `}>
          <NavbarMobile subLinks={sublinks} setshow={setshow} show={show} />
        </nav>
      </div>
      
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  matchPath,
  useNavigate,
} from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavbarLinks as links } from "../../data/navbar-links";
import Logout from "../../services/auth/Logout";
import { VscDashboard } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";

import axios from "axios";

const NavbarMobile = ({ show, setshow }) => {
  const [sublinks, setsublinks] = useState([]);

  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }

  const fetchsublinks = async () => {
    try {
      var url = import.meta.env.VITE_REACT_APP_BASE_URL;

      const result = await axios.get(`${url}/showallcategories`);

      setsublinks(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchsublinks();
  }, []);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [width, setwidth] = useState("0px");
  const navRef = useRef();
  const [maxHeight, setMaxHeight] = useState("0px");
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const toggleContent = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);
  useEffect(() => {
    if (navRef.current) {
      setwidth(isOpen ? `${navRef.current.scrollWidth}px` : "0px");
    }
  }, [show]);

  const [maxHeight1, setMaxHeight1] = useState("0px");
  const [isOpen1, setIsOpen1] = useState(false);
  const contentRef1 = useRef(null);
  const toggleContent1 = () => {
    setIsOpen1(!isOpen1);
  };
  useEffect(() => {
    if (contentRef1.current) {
      setMaxHeight1(isOpen1 ? `${contentRef1.current.scrollHeight}px` : "0px");
    }
  }, [isOpen1]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      <div
        ref={navRef}
        style={{
          width: show ? `200px` : "0px",
          transition: "width 0.4s ease",
        }}
        className={`text-white mt-[50px]  ${
          show ? "flex translate-x-0" : " -translate-x-full"
        }  flex-col  border-r-[1px] border-r-richblack-600 shadow-lg  ${
          show && "shadow-richblack-400   "
        }   fixed  overflow-y-scroll w-[200px] top-0 bg-richblack-800 h-screen z-10  ${
          location.pathname.split("/")[1] === "view-course" && "hidden"
        }  left-0 `}
      >
        {token !== null && (
          <div className="border-b-[1px] border-b-richblack-700 pb-4 w-full flex flex-col justify-center items-center text-center my-4">
            <div
              onClick={toggleContent1}
              className="flex justify-center items-center gap-1"
            >
              <img src={user?.image} className="w-[50px] rounded-full"></img>{" "}
              <div
                className={`${
                  isOpen1 ? "rotate-180" : " "
                } transition-all duration-1000 `}
              >
                <IoMdArrowDropdown
                  size="15px"
                  color="white"
                  className="inline"
                />
              </div>
            </div>
            <div
              ref={contentRef1}
              style={{
                maxHeight: maxHeight1,
                transition: "max-height 0.7s ease",
                overflow: "hidden",
              }}
              className=" relative top-4      text-white  w-[90%] m-auto items-center text-center     z-10 rounded-md flex flex-col"
            >
              <Link
                onClick={() => {
                  setIsOpen(false);
                  setIsOpen1(false);
                  setMaxHeight("0px");
                  setshow(false);
                }}
                to="/dashboard/my-profile"
                className="hover:bg-richblack-800 w-full   justify-center  flex gap-1 items-center py-2"
              >
                {" "}
                <VscDashboard
                  className="inline"
                  size="20px"
                  height="20px"
                />{" "}
                dashboard
              </Link>

              <div
                onClick={() => {
                  setIsOpen(false);
                  setIsOpen1(false);
                  setMaxHeight("0px");
                  setshow(false);

                  Logout(dispatch, navigate);
                }}
                className=" hover:bg-richblack-800 flex gap-1 items-center  p-2"
              >
                {" "}
                <IoMdLogOut className={`inline `} size="20px" height="20px" />
                Logout
              </div>
            </div>
          </div>
        )}
        <div
          className={`${
            location.pathname.split("/")[1] === "dashboard" ? "block" : "hidden"
          } border-b-[1px] border-t-[1px] border-dotted  `}
        >
          <Sidebar show={show} setshow={setshow} />
        </div>
        <ul className="flex relative flex-col flex-wrap gap-x-6 text-richblack-25 ">
          {links.map((link, index) => {
            return (
              <li
                key={index}
                className="  w-full bg-richblack-800 items-center flex flex-col"
              >
                {link.title === "Catalog" ? (
                  <div className=" flex justify-center flex-col p-2 ">
                    <div
                      onClick={toggleContent}
                      className=" text-center items-center flex  justify-center  "
                    >
                      {link.title}
                      <div
                        className={`${
                          isOpen ? "rotate-180" : " "
                        } transition-all duration-1000 `}
                      >
                        <IoMdArrowDropdown
                          size="15px"
                          color="white"
                          className="inline"
                        />
                      </div>
                    </div>
                    <div
                      ref={contentRef}
                      style={{
                        maxHeight: maxHeight,
                        transition: "max-height 0.7s ease",
                        overflow: "hidden",
                      }}
                      className={`flex p-1   flex-col gap-2`}
                    >
                      {sublinks.map((lnk, index) => {
                        return (
                          <Link
                            onClick={() => {
                              setIsOpen(false);
                              setIsOpen1(false);
                              setMaxHeight("0px");
                              setshow(false);
                            }}
                            className={`p-2 w-full text-center text-richblack-50 bg-richblack-800  ${
                              isOpen ? "border-[1px] border-richblack-700" : ""
                            }  rounded-md   `}
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
                ) : (
                  <Link
                    onClick={() => {
                      setIsOpen(false);
                      setIsOpen1(false);
                      setMaxHeight("0px");
                      setshow(false);
                    }}
                    to={link?.path}
                    className={`${
                      matchRoute(link?.path) ? "text-yellow-25" : "text-white"
                    } bg-richblack-800 p-3 text-center w-full`}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {user && user.accountType != "Instructor" && (
          <Link
            onClick={() => {
              setIsOpen(false);
              setMaxHeight("0px");
              setshow(false);
            }}
            to="/dashboard/cart"
            className=" flex justify-center my-2 p-3 hover:bg-richblack-500 "
          >
            {totalItems !== 0 && (
              <div className="text-yellow-25 relative transition-all  animate-bounce duration-1000     left-[30px] top-[-10px] text-center px-1  flex  items-center  bg-richblack-700 rounded-full h-[20px] w-[20px]">
                {totalItems}
              </div>
            )}

            <FaShoppingCart color="white" size={"22px"} />
          </Link>
        )}

        {token === null && (
          <Link
            to="/login"
            onClick={() => {
              setIsOpen(false);
              setMaxHeight("0px");
              setshow(false);
            }}
            className="text-white flex justify-center my-2 "
          >
            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
              Login
            </button>
          </Link>
        )}

        {token === null && (
          <Link
            to="/signup"
            onClick={() => {
              setIsOpen(false);
              setMaxHeight("0px");
              setshow(false);
            }}
            className="text-white flex justify-center"
          >
            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
              signup
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default NavbarMobile;

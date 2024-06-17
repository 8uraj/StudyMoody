import React, { useEffect, useRef, useState } from "react";
import Logout from "../../services/auth/Logout";
import SidebarLink from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../data/dashboard-links";
import ConfirmationModal from "../common/ConfirmationModal";
import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Sidebar({show,setshow}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [confirmationmodal, setconfirmationmodal] = useState(false);
  const contentRef=useRef(null);
  const [maxHeight,setMaxHeight]=useState("0px");
  const [isOpen,setIsOpen]=useState(false);
  useEffect(()=>{
         if (contentRef.current) {
           setMaxHeight(
             isOpen ? `${contentRef.current.scrollHeight}px` : "0px"
           );
         }
  },[isOpen]);
  const handlelogout = async (e) => {
    setconfirmationmodal(true);
  };
  return (
    <div
      className={`text-white flex flex-col items-center  w-full ${
        isOpen && "h-full"
      }   md:pt-12 bg-richblack-800 md:h-full md:py-4`}
    >
      <div
        className="md:hidden my-2 flex gap-1 "
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Dashboard{" "}
        <div
          className={`${
            isOpen ? "rotate-180" : " "
          } transition-all duration-1000 `}
        >
          <IoMdArrowDropdown size="15px" color="white" className="inline" />
        </div>
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          transition: "max-height 0.7s ease",
          overflow: "hidden",
        }}
        className="md:w-[87%] w-[99%] md:min-h-full flex flex-col items-center "
      >
        {sidebarLinks?.map((sidelink, index) => {
          return sidelink.type &&
            sidelink?.type !== user?.accountType ? null : (
            <SidebarLink
              key={index}
              name={sidelink.name}
              path={sidelink.path}
              icon={sidelink.icon}
            ></SidebarLink>
          );
        })}
        <div className="hidden md:block w-[90%] mx-auto border-[1px] my-4  border-richblack-600"></div>
        <SidebarLink
          name={"Settings"}
          path={"/dashboard/setting"}
          icon={"VscSettingsGear"}
        />
        <div
          className=" hidden text-sm font-medium  py-4 pl-4  md:flex gap-1 items-center  px-2 w-full"
          onClick={handlelogout}
        >
          <GrLogout className="inline" size={"17px"} /> Logout
        </div>
      </div>

      {confirmationmodal && (
        <ConfirmationModal
          modalData={{
            text1: "Are you sure?",
            text2: "You will loggout from account",
            btn1handler: () => dispatch(Logout(dispatch, navigate)),
            btn2handler: () => setconfirmationmodal(false),
            btntext1: "Logout",
            btntext2: "Cancel",
          }}
        ></ConfirmationModal>
      )}
    </div>
  );
}

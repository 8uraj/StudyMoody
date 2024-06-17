import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {FooterLink2} from "../../data/footer-links";
import { FaGoogle } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="flex flex-col bg-richblack-800 w-full mt-4">
      <div className="flex md:justify-around  mt-5  p-6 flex-wrap justify-center gap-10">
        <div className="flex flex-col gap-2 text-sm text-richblack-300">
          <img src={logo}></img>
          <div className="my-2 text-lg font-semibold">Comapny</div>
          <div>About</div>
          <div>Careers</div>
          <div>Affilites</div>

          <div className="flex gap-5 mt-2">
            <BsFacebook size={"20px"} />
            <FaGoogle size={"20px"} />
            <FaTwitter size={"20px"} />
            <FaYoutube size={"20px"} />
          </div>
        </div>
        <div className="flex flex-col gap-1 text-richblack-300 text-sm">
          <div className="mb-2 font-semibold text-lg text-white">Resourses</div>
          <div>Articles</div>
          <div>Blog</div>
          <div>Chart Sheet</div>
          <div>Code challenges</div>
          <div>Docs</div>
          <div>Projects</div>
          <div>Videos</div>
          <div>Workspaces</div>
          <div className="font-semibold text-white text-lg mt-4">Support</div>
          <div>Help Center</div>
        </div>
        <div className="flex flex-col gap-2 text-richblack-300 text-sm pr-8 lg:border-r-[1px]  border-richblack-700">
          <div className="font-semibold text-white text-lg">Plans</div>
          <div>Paid memberships</div>
          <div>For students</div>
          <div>Business solutions</div>
          <div className="mt-2 font-semibold text-lg text-white">Community</div>
          <div>Forums</div>
          <div>Chapters</div>
          <div>Events</div>
        </div>
        <div className="flex flex-col gap-2 text-richblack-300 text-sm ">
          <div className="font-semibold text-white text-lg">
            {FooterLink2[0].title}
          </div>
          {FooterLink2[0].links.map((data,ind) => {
            return (
              <a href={data.link} key={ind}>
                {" "}
                {data.title}
              </a>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 text-richblack-300 text-sm">
          <div className="font-semibold text-white text-lg">
            {FooterLink2[1].title}
          </div>
          {FooterLink2[1].links.map((data,ind) => {
            return (
              <a href={data.link} key={ind}>
                {" "}
                {data.title}
              </a>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 text-richblack-300 text-sm ">
          <div className="font-semibold text-white text-lg">
            {FooterLink2[2].title}
          </div>
          {FooterLink2[2].links.map((data,ind) => {
            return <a href={data.link} key={ind}> {data.title}</a>;
          })}
        </div>
      </div>
      <div className="flex  justify-center md:justify-between gap-3 w-[90%] m-auto border-t-[1px] border-richblack-700 p-14">
        <div className="flex gap-3 text-richblack-300">
          <div className="border-r-[1px] pr-2 border-richblack-300">
            Privacy Policy
          </div>
          <div className="border-r-[1px] pr-2 border-richblack-300">
            Cookie Policy
          </div>
          <div>Terms</div>
        </div>
        <div >
          Made with <FaHeart className='inline mx-1 ' color='red'  />  Prathamesh
        </div>
      </div>
    </div>
  );
}

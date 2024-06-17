import React from "react";
import HighlightText from "../components/Homepage/HighlightText";
import HighlightTextRed from "../components/Homepage/HighlightTextRed";
import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";
import img4 from "../assets/Images/FoundingStory.png";
import Footer from "../components/Homepage/Footer";
import BTN from "../components/Homepage/Button";
import Box from "../components/Aboutpage/Box.jsx";
import ReviewSlider from "../components/common/ReviewSlider.jsx";
export default function About() {
  return (
    <div className="text-white mt-0">
      <div className="w-full p-4 bg-richblack-700">
        {/* section 1 */}
        <div className="text-[2rem] font-semibold m-auto w-full text-center mt-[80px] mb-[20px]">
          Driving Innovation in Online Education for a{" "}
          <HighlightText>Brighter Future</HighlightText>{" "}
        </div>
        <div className=" w-[60%] min-w-[300px] text-center m-auto">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </div>
        <div className="w-[95%] md:w-[90%] max-h-fit   flex justify-around m-auto relative md:top-[100px] top-[60px]  ">
          <img src={img1} className="w-[30%] relative top-[40%] "></img>
          <img src={img2} className="w-[30%] relative top-[40%] "></img>
          <img src={img3} className="w-[30%] relative top-[40%] "></img>
        </div>
      </div>

      <div className="w-[90%] text-[5vw] lg:text-[2vw] md:text-[3vw] font-semibold m-auto text-center md:pt-[10%] pt-[20%] ">
        We are passionate about revolutionizing the way we learn. Our innovative
        platform combines <HighlightText>technology</HighlightText> ,
        <HighlightText> expertise</HighlightText> , and community to create an
        <HighlightText> unparalleled educational experience.</HighlightText>
      </div>

      <div className="border-solid border-[0.1px] border-richblack-600  my-[40px] w-[90%] m-auto"></div>

      <div className="w-[100%] mt-[50px] flex flex-wrap-reverse m-auto gap-8 ">
        <div className="text-richblack-100 lg:w-[40%] w-[90%] p-8 flex flex-col gap-4 items-center min-w-[300px] md:w-[60%] md:min-w-[400px] m-auto ">
          <div className="text-[2rem] font-semibold  text-center md:text-start">
            {" "}
            <HighlightTextRed>Our Founding Story</HighlightTextRed>{" "}
          </div>
          <div className="text-center md:text-start">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </div>
          <div className="text-center md:text-start">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </div>
        </div>

        <div className="w-[40%]  m-auto min-w-[300px] md:min-w-[400px] sm:my-8 md:m-auto">
          <img
            src={img4}
            className=" min-w-[300px]  md:min-w-[400px] md:h-[40vh]"
          ></img>
        </div>
      </div>

      {/*  mission and vision section */}
      <div className="w-[90%] flex flex-wrap justify-around m-auto  my-20 ">
        <div className="lg:w-[45%] flex flex-col items-center p-4 gap-4  md:w-[60%] w-[90%]">
          <div className="text-[2rem] font-semibold ">
            <HighlightText>Our Vision</HighlightText>
          </div>
          <div className="text-center">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </div>
        </div>

        <div className="lg:w-[45%] flex flex-col items-center p-4 gap-4 md:w-[60%] w-[90%]">
          <div className="text-[2rem] font-semibold ">
            <HighlightTextRed>Our mission</HighlightTextRed>
          </div>
          <div className="text-center">
            Our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </div>
        </div>
      </div>
      <div className="px-2 text-center flex w-full justify-around h-[100px] bg-richblack-700 items-center sm:w[120%]">
        <div className="w-[25%] hover:bg-richblack-200">
          <div className="md:text-[2rem] text-[1.6rem]">5K</div>
          <div className="text-richblack-200">Active Students</div>
        </div>
        <div className="w-[25%] ">
          <div className="md:text-[2rem] text-[1.6rem]">10+</div>
          <div className="text-richblack-200">Mentors</div>
        </div>
        <div className="w-[25%] ">
          <div className="md:text-[2rem] text-[1.6rem]">200+</div>
          <div className="text-richblack-200">Courses</div>
        </div>
        <div className="w-[25%] ">
          <div className="md:text-[2rem] text-[1.6rem]">50+</div>
          <div className="text-richblack-200">Awards</div>
        </div>
      </div>
      <div className="w-[100%] md:w-[90%] m-auto my-10 flex flex-wrap min-w-[310px] md:[600px] ">
        <div className="w-full flex flex-wrap justify-center">
          <div className="lg:w-[50%] w-full flex flex-col items-center text-center">
            <div className="text-[2rem] w-full md:w-[90%] m-auto p-4 text-center md:text-start font-semibold">
              World-Class Learning for{" "}
              <HighlightText>Anyone, Anywhere</HighlightText>
            </div>
            <div className="w-full md:w-[90%] m-auto p-4  md:text-start ">
              Studynotion partners with more than 275+ leading universities and
              companies to bring flexible, affordable, job-relevant online
              learning to individuals and organizations worldwide.
            </div>
            <div className="  w-full md:w-[90%] m-auto p-4  md:text-start flex justify-center lg:justify-start ">
              <BTN   active>Learn More</BTN>
            </div>
          </div>
          <div>
            
          </div>
          <Box
            active
            className="w-[25%]"
            heading="Curriculum Based on Industry Needs"
            body="Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
          ></Box>
          <Box
            className="w-[25%]"
            heading="Curriculum Based on Industry Needs"
            body="Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
          ></Box>
        </div>

        <div className="w-full flex flex-wrap lg:justify-end justify-center">
          <Box
            active
            className="w-[25%]"
            heading="Curriculum Based on Industry Needs"
            body="Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
          ></Box>
          <Box
            className="w-[25%]"
            heading="Curriculum Based on Industry Needs"
            body="Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
          ></Box>
          <Box
            active
            className="w-[25%]"
            heading="Curriculum Based on Industry Needs"
            body="Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
          ></Box>
        </div>
        <ReviewSlider/>
      </div>
      <Footer></Footer>
    </div>
  );
}

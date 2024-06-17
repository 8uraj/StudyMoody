import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
import { updatecompletedLectures } from "../../slices/viewCourse";
import IconBtn from "../common/IconBtn";
import { RxCross1 } from "react-icons/rx";
import { SlMenu } from "react-icons/sl";

import CourseReviewModal from "./CourseReviewModal";
import VideoDetailsSidebar from "./VideoDetailsSidebarMobile";

export default function VideoDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const [showlec, setshowlec] = useState(false);
  const {
    courseSectionData,
    EntirecourseData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  const [videoEnded, setvideoEnded] = useState(false);
  const [loading, setloading] = useState(false);
  const [video, setvideo] = useState("");
  const [reviewModal, setreviewModal] = useState(false);
  const { courseId, subSectionId, sectionId } = useParams();

  const isfirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const currentsubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);
    if (currentSectionIndex === 0 && currentsubSectionIndex === 0) {
      return true;
    }
    return false;
  };
  const islastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsection =
      courseSectionData[currentSectionIndex]?.subSection?.length;
    const currentsubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);
    if (
      currentSectionIndex === courseSectionData?.length - 1 &&
      currentsubSectionIndex === noOfSubsection - 1
    ) {
      return true;
    }
    return false;
  };
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsection =
      courseSectionData[currentSectionIndex]?.subSection?.length;
    const currentsubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentsubSectionIndex != noOfSubsection - 1) {
      // go to next video in same section
      const nextsubsectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentsubSectionIndex + 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextsubsectionId}`
      );
    } else {
      // go to next sections's first video
      const nextsectionId = courseSectionData[currentSectionIndex + 1]?._id;
      const nextsubsectionId =
        courseSectionData[currentSectionIndex + 1]?.subSection[0]?._id;
      navigate(
        `/view-course/${courseId}/section/${nextsectionId}/sub-section/${nextsubsectionId}`
      );
    }
  };
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsection =
      courseSectionData[currentSectionIndex]?.subSection?.length;
    const currentsubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentsubSectionIndex != 0) {
      // go to prev video in same section
      const prevsubsectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentsubSectionIndex - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevsubsectionId}`
      );
    } else {
      // go to prev sections's first video
      const noOfSubsectionInprevSection =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevsectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevsubsectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          noOfSubsectionInprevSection - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevsectionId}/sub-section/${prevsubsectionId}`
      );
    }
  };
  const handelLectureCompletion = async () => {
    try {
      var url = import.meta.env.VITE_REACT_APP_BASE_URL;
      const result = await axios.post(`${url}/updateCourseProgress`, {
        courseId: courseId,
        subSectionId: subSectionId,
        token,
      });

      if (result.data.success) {
        toast.success("Lecture marked completed");
        dispatch(updatecompletedLectures(subSectionId));
      } else {
        toast.error(result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      !courseId ||
      !sectionId ||
      !subSectionId ||
      courseSectionData.length === 0
    ) {
      toast.error("Course Not available");
      navigate("/dashboard/enrolled-courses");
      return;
    }
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentsubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    const activeSubsection =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentsubSectionIndex
      ];

    setvideo(activeSubsection);
    setvideoEnded(false);
  }, [subSectionId, sectionId, location.pathname]);

  return (
    <div className="flex flex-col gap-5 text-white mt-14 md:mt-24 ">
      <div className=" visible md:hidden flex justify-between md:justify-end mt-2  md:mr-12">
        <button
          className="text-white block md:hidden z-[100] "
          onClick={() => setshowlec(!showlec)}
        >
          {showlec ? <RxCross1 size={"25px"} /> : <SlMenu size={"25px"} />}
        </button>
        <div className=" visible md:hidden flex gap-x-3">
          {!isfirstVideo() && (
            <div
              onClick={() => {
                goToPrevVideo();
                setvideoEnded(false);
              }}
              className=" p-1 bg-yellow-50 text-black rounded-md px-2"
            >
              prev
            </div>
          )}
          {!islastVideo() && (
            <div
              onClick={() => {
                goToNextVideo();
                setvideoEnded(false);
              }}
              className=" p-1 bg-yellow-50 text-black rounded-md px-2"
            >
              next
            </div>
          )}
        </div>
      </div>
      {!video?.videoUrl ? (
        <div>video not found</div>
      ) : (
        <div className="rounded-xl ">
          <Player
            autoPlay={true}
            aspectRatio="16:9"
            ref={playerRef}
            playsInline
            onEnded={() => setvideoEnded(true)}
            src={video?.videoUrl}
          >
            <BigPlayButton position="center" />
            {videoEnded && (
              <div className="w-full md:top-28 absolute inset-0 z-[100] grid h-fit place-content-center font-inter">
                {!completedLectures?.includes(subSectionId) && (
                  <IconBtn
                    active
                    customClasses=" my-2 md:my-4 md:py-4 py-2 text-[17px] max-w-max px-4 mx-auto"
                    disabled={loading}
                    onClick={() => handelLectureCompletion()}
                    text={loading ? "Loading..." : `Mark as completed`}
                  />
                )}

                <IconBtn
                  customClasses=" text-[17px] my-2  max-w-max px-4 mx-auto"
                  disabled={loading}
                  onClick={() => {
                    if (playerRef?.current) {
                      playerRef?.current?.seek(0);
                      setvideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                />

                <div className="mt-2 md:mt-6  flex  justify-start gap-x-4 text-lg">
                  {!isfirstVideo() && (
                    <IconBtn
                      active
                      customClasses="flex items-center px-4 max-h-[40px] mx-auto"
                      disabled={loading}
                      text="prev"
                      onClick={() => {
                        goToPrevVideo();
                        setvideoEnded(false);
                      }}
                    />
                  )}
                  {!islastVideo() && (
                    <IconBtn
                      disabled={loading}
                      customClasses="flex items-center px-4 max-h-[40px] mx-auto"
                      text="next"
                      onClick={() => {
                        goToNextVideo();
                        setvideoEnded(false);
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </Player>
        </div>
      )}
      <div
        className={`absolute left-0 z-[104] bg-richblack-800 max-w-[250px]   md:hidden block text-white  ${
          showlec ? "block" : "hidden"
        }  `}
      >
        <VideoDetailsSidebar
          setshowlec={setshowlec}
          setreviewModal={setreviewModal}
        />
      </div>
      {reviewModal ? (
        <CourseReviewModal setreviewModal={setreviewModal} />
      ) : (
        <div></div>
      )}
      <div className="flex flex-col ">
        <div className="text-[1.2rem]">{video?.title}</div>
        <div className="text-richblack-100  ">{video?.description}</div>
      </div>
    </div>
  );
}

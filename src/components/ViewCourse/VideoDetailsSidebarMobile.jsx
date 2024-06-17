import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import IconBtn from "../common/IconBtn";
import { RxCross1 } from "react-icons/rx";
export default function VideoDetailsSidebar({ setreviewModal, setshowlec }) {
  const [activeSection, setactiveSection] = useState("");
  const [activesubSection, setactivesubSection] = useState("");
  const [videobaractive, setvideobaractive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId, courseId } = useParams();
  const location = useLocation();
  const {
    courseSectionData,
    EntirecourseData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  useEffect(() => {
    (() => {
      if (courseSectionData.length === 0) {
        toast.error("No lectures found in this course");
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentsubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubsectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentsubSectionIndex
        ]?._id;

      setactiveSection(courseSectionData?.[currentSectionIndex]?._id);
      setactivesubSection(activeSubsectionId);
    })();
  }, [courseSectionData, EntirecourseData, location.pathname]);

  return (
    <>
      <div className="pl-2 py-2 px-0 pt-2  max-w-[300px] overflow-y-scroll max-h-[560px] ">
        <div onClick={() => setshowlec(false)} className="px-4 my-2">
          <RxCross1 size={"25px"} />
        </div>
        <div className="flex flex-col  gap-2">
          <div className="w-full flex gap-x-3 items-center justify-around px-2">
            <div
              onClick={() => {
                setshowlec(false);
                navigate("/dashboard/enrolled-courses");
              }}
            >
              <IoChevronBackCircleOutline size={"35px"} />
            </div>
            <div>
              <IconBtn
                text="Add Review"
                active
                onClick={() => {
                  setreviewModal(true);
                  setshowlec(false);
                }}
              />
            </div>
          </div>
          <div className="p-2">
            <p className="text-[1.2rem] font-semibold">
              {EntirecourseData?.courseName}
            </p>
            <p className="text-richblack-50">
              {completedLectures?.length ? completedLectures?.length : 0}/
              {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="max-w-[300px] p-1">
          {courseSectionData?.map((section, index) => (
            <div
              className={`flex-col flex gap-1 `}
              onClick={() => {
                setactiveSection(section._id);
              }}
            >
              <div
                key={index}
                className={`flex items-center justify-between gap-x-3 w-full bg-richblack-800 p-4 ${
                  activeSection === section._id ? "bg-richblack-600" : ""
                } rounded-lg `}
              >
                <div className={`max-w-[150px]  `}> {section.sectionName}</div>
                <div
                  className={`${
                    !(activeSection === section._id) &&
                    "rotate-180 transition-all duration-500 ease-in-out "
                  }`}
                >
                  <IoIosArrowUp />
                </div>
              </div>

              <div className="max-w-[300px] p-2">
                {activeSection === section._id && (
                  <div>
                    {section.subSection?.map((subsection, index) => (
                      <div
                        onClick={() => {
                          navigate(
                            `/view-course/${courseId}/section/${section._id}/sub-section/${subsection._id}`
                          );
                          setshowlec(false);
                          setactivesubSection(subsection._id);
                        }}
                        className={`flex gap-x-3 px-3 p-2   ${
                          subsection._id === activesubSection
                            ? "bg-yellow-50 text-black "
                            : "bg-black text-white"
                        } `}
                      >
                        <div>
                          <input
                            type="checkbox"
                            checked={completedLectures?.includes(
                              subsection?._id
                            )}
                          ></input>
                        </div>
                        <div>{subsection.title}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

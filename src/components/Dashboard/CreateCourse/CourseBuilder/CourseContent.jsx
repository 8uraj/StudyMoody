import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { RxDropdownMenu } from "react-icons/rx";
import ConfirmationModal from "../../../common/ConfirmationModal";
import toast from "react-hot-toast";
import IconBtn from "../../../common/IconBtn";
import axios from "axios";
import { seteditCourseInfo } from "../../../../slices/courseSlice";
import SubSectionModal from "./SubSectionModal";
export default function CourseContent({ seteditSectionName, setsection }) {
  const dispatch = useDispatch();
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { editCourseInfo } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [addsubsection, setAddsubsection] = useState(null);
  const [editsubsection, setEditsubsection] = useState(null);
  const [viewsubsection, setViewsubsection] = useState(null);
  const [confirmationmodal, setconfirmationmodal] = useState(null);
  const handleDeleteSection = async (sectionId) => {
    if (!sectionId) {
      toast.error("Section is not selected to delete");
      return;
    }
    try {
      const result = await axios.post(`${url}/deleteSection`, {
        token,
        sectionId,
        courseId: editCourseInfo?._id,
      });
      if (result.data.success) {
        toast.success("Section deleted successfully");
        dispatch(seteditCourseInfo(result.data.course));
        setconfirmationmodal(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    if (!subSectionId) {
      toast.error("subSection is not selected to delete");
      return;
    }

    try {
      
      const result = await axios.post(`${url}/deleteSubSection`, {
        token,
        sectionId,
        subSectionId,
        courseId: editCourseInfo?._id,
      });

      if (result.data.success) {
        toast.success("Lecture deleted successfully");
        dispatch(seteditCourseInfo(result.data.course));
        setconfirmationmodal(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className=" flex flex-col gap-4  my-4 rounded-lg ">
        {editCourseInfo?.courseContent?.map((section, index) => {
          return (
            <details
              key={section._id}
              open
              className=" border-richblack-700 rounded-lg border-[1px] p-4 bg-richblack-800 "
            >
              <summary className="flex items-center justify-between gap-x-3 my-2  ">
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu size={"25px"} />
                  <div>{section.sectionName}</div>
                </div>
                <div className="flex gap-x-3 items-center">
                  <MdEdit
                    onClick={() => {
                      setsection(section.sectionName);
                      seteditSectionName(section._id);
                    }}
                    size={"25px"}
                    className="text-richblack-200"
                  />
                  <MdDelete
                    size={"25px"}
                    className="text-richblack-200"
                    onClick={() => {
                      setconfirmationmodal({
                        text1: "Delete this section",
                        text2: "All the lectures in section will be deleted",
                        btntext1: "Delete",
                        btntext2: "Cancel",
                        btn1handler: () => handleDeleteSection(section._id),
                        btn2handler: () => setconfirmationmodal(null),
                      });
                    }}
                  />
                  {confirmationmodal && (
                    <ConfirmationModal modalData={confirmationmodal} />
                  )}
                  <span>|</span>
                  <FaCaretDown className="text-richblack-200" />
                </div>
              </summary>
              <div>
                {section.subSection?.map((subSection) => {
                  return (
                    <div
                      key={subSection._id}
                      onClick={() => setViewsubsection(subSection)}
                      className="pl-4 mt-4 flex bg-richblack-700 p-4 rounded-md items-center justify-between gap-x-3"
                    >
                      <div className="flex items-center gap-x-3">
                        <RxDropdownMenu />
                        <div>{subSection.title}</div>
                      </div>

                      <div className="flex items-center gap-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditsubsection({
                              ...subSection,
                              sectionId: section._id,
                            });
                          }}
                        >
                          <MdEdit
                            size={"20px"}
                            className="text-richblack-200"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setconfirmationmodal({
                              text1: "Delete this lecture",
                              text2: "A lecture will be deleted ",
                              btntext1: "Delete",
                              btntext2: "Cancel",
                              btn1handler: () =>
                                handleDeleteSubSection(
                                  subSection._id,
                                  section._id
                                ),
                              btn2handler: () => setconfirmationmodal(null),
                            });
                          }}
                        >
                          <MdDelete
                            size={"20px"}
                            className="text-richblack-200"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={() => setAddsubsection(section._id)}
                  className="mt-4 flex flex-items-center gap-x-2 text-yellow-50 "
                >
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          );
        })}
      </div>

      {addsubsection ? (
        <SubSectionModal
          modalData={addsubsection}
          setmodalData={setAddsubsection}
          add={true}
        />
      ) : editsubsection ? (
        <SubSectionModal
          modalData={editsubsection}
          setmodalData={setEditsubsection}
          edit={true}
        />
      ) : viewsubsection ? (
        <SubSectionModal
          modalData={viewsubsection}
          setmodalData={setViewsubsection}
          view={true}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

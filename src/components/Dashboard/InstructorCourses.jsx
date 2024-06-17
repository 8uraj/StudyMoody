import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FiClock, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import CourseCard from "./Instructorcourses/CourseCard";
import toast from "react-hot-toast";
import Loading from "../../pages/Loading";
import { seteditCourse } from "../../slices/courseSlice";
import { seteditCourseInfo } from "../../slices/courseSlice";
import { setStep } from "../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { formatDate } from "../../services/formatDate";
import ConfirmationModal from "../common/ConfirmationModal";
import convertSecondsToDuration from "../../utils/setToDuration";
export default function InstructorCourses() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [courses, setcourses] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [confirmationModal, setconfirmationModal] = useState(null);

  const deleteCourse = async (courseId) => {
    try {
      if (!courseId) {
        toast.error("Course not found to delete");
        return;
      }
      setloading(true);

      const result = await axios.post(`${url}/deleteCourse`, {
        courseId,
        token,
      });
      if (!result.data.success) {
        toast.error("Course deletion failed");
        return;
      }
      const updatedCourses = await axios.post(`${url}/getInstructorCourses`, {
        InstructorId: user._id,
        token,
      });

      if (updatedCourses.data.success) {
        setcourses(updatedCourses.data.allCourses);
        toast.success("Course deleted successfully");
        setconfirmationModal(null);
      }
      setloading(false);
    } catch (err) {
      console.log("Error in deleting course");
      console.log(err);
      toast.error("Error in deleting course");
    }
  };
  const totalSecond = (course) => {
    var sec = 0;
    course?.courseContent?.forEach((section) => {
      section?.subSection?.forEach((lec) => {
        sec += parseInt(lec.timeDuration);
      });
    });

    return sec;
  };
  const editCourse = async (course) => {
    dispatch(seteditCourse(true));

    dispatch(seteditCourseInfo(course));
    dispatch(setStep(1));
    navigate("/dashboard/edit-course");
  };
  useEffect(() => {
    (async () => {
      try {
        setloading(true);

        const result = await axios.post(`${url}/getInstructorCourses`, {
          InstructorId: user._id,
          token,
        });

        setcourses(result.data.allCourses);
        setloading(false);
      } catch (err) {
        console.log("Error in fetching courses");
        toast.error("Error in getting your courses");
      }

      setloading(false);
    })();
  }, []);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="text-white">
          <div className="flex justify-around md:justify-between w-full ">
            <div className="md:text-[2rem] text-[1.7rem] font-semibold ">My Courses</div>
            <Link
              onClick={() => {
                dispatch(setStep(1));
                dispatch(seteditCourseInfo(null));
              }}
              to="/dashboard/add-course"
              className="bg-yellow-50 text-black p-2 rounded-md max-h-[55px] gap-x-1   flex justify-center flex-wrap items-center"
            >
              <p> Add Course</p> <IoMdAdd className="inline " size={"22px"} />
            </Link>
          </div>

          {/* // table */}
          <div>
            {/* all instructor courses */}
            <Table className="my-12 items-center hidden md:block">
              <Thead>
                <Tr className="flex flex-col md:flex-row md:gap-x-10 rounded-t-md border-b border-b-richblack-800 md:px-6 py-2">
                  <Th className="flex-1  text-left text-sm font-medium uppercase text-richblack-100">
                    Courses
                  </Th>
                  <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Duration
                  </Th>
                  <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Price
                  </Th>
                  <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody className=" w-full">
                {courses.length === 0 ? (
                  <Tr>
                    <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                      No courses found
                    </Td>
                  </Tr>
                ) : (
                  courses.map((course) => (
                    <Tr
                      key={course._id}
                      className=" flex md:flex-row flex-col md:gap-y-20   my-16 md:my-4 border-[1px] border-richblack-700  md:gap-x-10 md:p-8  "
                    >
                      <Td className="flex gap-x-4 md:w-[600px] ">
                        <div className="w-[350px] h-[250px]">
                          <img
                            src={course?.thumbnail}
                            className="w-[200px] h-[200px] aspect-auto shadow-md shadow-blue-500   rounded-md object-cover  object-center "
                          ></img>
                        </div>
                        <div className="flex flex-col gap-4 my-2">
                          <div> {course.courseName}</div>
                          <div>
                            {" "}
                            {course.courseDescription.slice(0, 100)}{" "}
                            {course.courseDescription.length > 100 && "..."}
                          </div>
                          <div>Created At : {formatDate(course.createdAt)}</div>
                          {course.status === "Draft" ? (
                            <div className=" text-pink-100 bg-richblack-700 rounded-full w-[90px] text-center text-md  flex items-center justify-center gap-1  ">
                              <FiClock className="inline  " size="15px" />{" "}
                              <div>Draft</div>
                            </div>
                          ) : (
                            <div className="text-caribbeangreen-50 rounded-full bg-richblack-700 w-[100px] text-center ">
                              Published
                            </div>
                          )}
                        </div>
                      </Td>
                      <Td>{convertSecondsToDuration(totalSecond(course))}</Td>
                      <Td className="">{course.price}</Td>
                      <Td className="flex gap-2 flex-nowrap ">
                        <FiEdit
                          size="20px"
                          onClick={() => editCourse(course)}
                        />
                        <MdDelete
                          size="20px"
                          onClick={() =>
                            setconfirmationModal({
                              text1: "Do you want to delete this course",
                              text2:
                                "All the data related with this course will be deleted.",
                              btntext1: "Delete",
                              btntext2: "Cancel",
                              btn1handler: () =>
                                !loading ? deleteCourse(course._id) : () => {},
                              btn2handler: () =>
                                !loading
                                  ? setconfirmationModal(null)
                                  : () => {},
                            })
                          }
                        />
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>

            <div className="block md:hidden">
              {courses.length === 0 ? (
                <div>
                  <div className="py-10 text-center text-2xl font-medium text-richblack-100">
                    No courses found
                  </div>
                </div>
              ) : (
                courses.map((course) => (
                  <div
                    key={course._id}
                    className="my-10 flex items-center p-2 flex-col gap-4 border-[1px] border-richblack-700    "
                  >
                    <img
                      src={course?.thumbnail}
                      className="w-[280px] h-[200px] aspect-auto shadow-md shadow-blue-500   rounded-md object-cover  object-center "
                    ></img>

                    <div className="flex flex-col gap-4 text-center ">
                      <div> {course.courseName}</div>
                      <div>
                        {" "}
                        {course.courseDescription.slice(0, 100)}{" "}
                        {course.courseDescription.length > 100 && "..."}
                      </div>
                      <div>Created At : {formatDate(course.createdAt)}</div>
                      <div>
                        {course.status === "Draft" ? (
                          <div className="mx-auto text-pink-100 bg-richblack-700 rounded-full w-[90px] text-center text-md  flex items-center justify-center gap-1  ">
                            <FiClock className="inline  " size="15px" />{" "}
                            <div>Draft</div>
                          </div>
                        ) : (
                          <div className="mx-auto text-caribbeangreen-50 text-center rounded-full bg-richblack-700 w-[100px]  ">
                            Published
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-around w-full">
                      <div>{convertSecondsToDuration(totalSecond(course))}</div>
                      <div className="">Rs.{course.price}</div>
                    </div>
                    <div className="flex gap-2 flex-nowrap ">
                      Actions :
                      <FiEdit size="20px" onClick={() => editCourse(course)} />
                      <MdDelete
                        size="20px"
                        onClick={() =>
                          setconfirmationModal({
                            text1: "Do you want to delete this course",
                            text2:
                              "All the data related with this course will be deleted.",
                            btntext1: "Delete",
                            btntext2: "Cancel",
                            btn1handler: () =>
                              !loading ? deleteCourse(course._id) : () => {},
                            btn2handler: () =>
                              !loading ? setconfirmationModal(null) : () => {},
                          })
                        }
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
          )}
        </div>
      )}
    </>
  );
}

{
  /* <div className=" text-richblack-100 w-full flex  justify-between mt-12 border-[1px] p-8 border-richblack-800">
            <div className="w-[70%]">COURSES</div>
            <div>DURATION</div>
            <div>PRICE</div>
            <div>ACTION</div>
          </div>
          <div>
            {courses?.map((course, index) => {
              return <CourseCard key={index} course={course} />;
            })}
          </div> */
}

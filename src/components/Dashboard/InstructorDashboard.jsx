import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../pages/Loading";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";
export default function InstructorDashboard() {
  const { token } = useSelector((state) => state.auth);
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { user } = useSelector((state) => state.profile);
  const [courses, setcourses] = useState("");
  const [instructorData, setinstructorData] = useState("");
  const [loading, setloading] = useState(false);
  const [totalAmount, settotalAmount] = useState(0);
  const [totalStudents, settotalStudents] = useState(0);
  const getcourseData = async () => {
    try {
      setloading(true);
      const result = await axios.post(`${url}/profile/instructorDashboardData`,{token});

      setinstructorData(result.data.data);

      const inscourses = await axios.post(`${url}/getInstructorCourses`, {
        InstructorId: user._id,token
      });

      setcourses(inscourses.data.allCourses);

      var amt = 0;
      result.data.data?.forEach(
        (course) => (amt += course.totalAmountGenerated)
      );
      settotalAmount(amt);
      var std = 0;
      result.data.data?.forEach(
        (course) => (std += course.totalStudentsEnrolled)
      );
      settotalStudents(std);
      setloading(false);
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };
  useEffect(() => {
    getcourseData();
  }, []);

  return (
    <div className="text-white">
      <div>
        <div className="font-semibold text-[1.2rem]">
          Hello {user?.firstName}👋
        </div>
        <p className="text-richblack-100">Let's start something new</p>
      </div>

      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          {courses?.length ? (
            <div className="my-4 ">
              <div className="flex flex-wrap justify-center md:justify-around">
                <div className="w-full md:w-[70%]">
                  <InstructorChart courses={instructorData} />
                </div>
                <div className=" my-4 md:my-0 h-fit p-4 bg-richblack-800 w-full md:w-[25%] rounded-xl flex flex-col gap-2 items-center md:items-start ">
                  <p className="text-[1.4rem] font-semibold">Statistics</p>
                  <div className="flex flex-col ">
                    <p>Total Courses</p>
                    <p className="text-[1.4rem] font-semibold">
                      {courses?.length}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <p>Total Students</p>
                    <p className="text-[1.4rem] font-semibold">
                      {totalStudents}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <p>Total Income</p>
                    <p className="text-[1.4rem] font-semibold">
                      Rs. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-8">
                <div className="flex justify-between my-2 ">
                  <p className="text-[1.4rem] font-semibold">Your Courses</p>
                  <Link to="/dashboard/my-courses" className="text-yellow-50 ">
                    View all
                  </Link>
                </div>
                <div className="flex  gap-1 md:justify-around justify-center flex-wrap ">
                  {courses &&
                    courses?.slice(0, 3).map((course) => (
                      <div key={course._id} className="w-[30%] min-w-[250px]">
                        <img src={course.thumbnail} className="w-full  h-[200px]"></img>
                        <div className="my-2">
                          <p>{course.courseName}</p>
                          <div className="flex gap-1 ">
                            <p>
                              {course.studentsEnrolled.length}{" "}
                              {course.studentsEnrolled.length === 1
                                ? "Student"
                                : "Students"}{" "}
                            </p>
                            <p>|</p>
                            <p>Rs. {course.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center justify-center my-12">
              <div className="text-[1.5rem]">
                {" "}
                You have not created courses yet{" "}
              </div>
              <Link to="/dashboard/add-course" className="text-yellow-50">
                {" "}
                Add course
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

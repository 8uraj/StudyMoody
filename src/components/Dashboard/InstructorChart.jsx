import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables);
export default function InstructorChart({ courses }) {
  const [currChart, setcurrChart] = useState("Student");
  const randomColors = (noOfColors) => {
    var colors = [];
    for (var i = 0; i < noOfColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };
 
  const chartDataForStudent = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: randomColors(courses.length),
      },
    ],
  };
  
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: randomColors(courses.length),
      },
    ],
  };
  const options = {};
  return (
    <div className="w-full bg-richblack-800 p-4 flex flex-col h-fit items-center md:items-start rounded-xl" >
      <div className="font-semibold" >Visualise</div>
      <div className="flex gap-2 my-2" >
        <button className={`p-2 bg-richblack-700 rounded-md py-1 ${currChart==="Student"?"text-yellow-50 ":""}`} onClick={() => setcurrChart("Student")}>Student</button>
        <button className={`p-2 bg-richblack-700 rounded-md py-1 ${currChart==="Income"?"text-yellow-50 ":""}`} onClick={() => setcurrChart("Income")}>Income</button>
      </div>
      <div className="w-full flex justify-center " >
        <Pie
          className=" max-h-[500px]"
          data={
            currChart === "Student" ? chartDataForStudent : chartDataForIncome
          }
          options={options}
        ></Pie>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "../components/Catalogpage/CourseCard";
import Footer from "../components/Homepage/Footer";
import { Link } from "react-router-dom";
import CourseSlider from "../components/Catalogpage/CourseSlider";
export default function Catalog() {
  const { catalogName } = useParams();
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [active, setactive] = useState(true);
  const [categoryId, setcategoryId] = useState(null);
  const [catalogPageData, setcatalogPageData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const getallCategories = await axios.get(`${url}/showAllCategories`);

        const catId = getallCategories?.data?.data?.filter(
          (cat) => cat.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        setcategoryId(catId);
      } catch (err) {
        console.log("error in fetching all categories");
      }
    })();
  }, [catalogName]);
  useEffect(() => {
    try {
      (async () => {
        const details = await axios.post(`${url}/categoryPageDetails`, {
          categoryId: categoryId,
        });
       
        setcatalogPageData(details.data.data);
      })();
    } catch (err) {
      console.log("error in fetching data of category");
      console.log(err);
    }
  }, [categoryId]);
  function changeActive(e) {
    if (e.target.innerHTML === "New") {
      setactive(false);
    } else {
      setactive(true);
    }
  }

  return (
    // {categoryId}
    // <div></div>
    // <div></div>
    <div className="text-white">
      {/* section 1 */}
      <div className="w-full m-auto flex flex-col  gap-3 bg-richblack-800 min-h-[300px]">
        <div className="w-full md:w-[90%]  flex justify-center text-center md:text-start flex-col gap-5 m-auto">
          <p>
            Home/Catalog/
            <span className="text-yellow-25">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-[2rem]">
            {catalogPageData?.selectedCategory?.name}
          </p>
          <p className="text-richblack-200">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* selected courses */}
      <div className="w-full flex text-center md:text-start flex-col md:w-[90%] my-10 m-auto gap-5 ">
        <p className="text-[2rem] font-semibold text-center md:text-start">
          Courses to get you started{" "}
        </p>
        <div className="flex px-5 gap-4 border-b-[1px] p-1 border-b-richblack-600">
          <div
            onClick={changeActive}
            className={`${
              active
                ? "text-yellow-25 underline underline-offset-[10px]"
                : "text-white"
            }`}
          >
            Most Popular
          </div>
          <div
            onClick={changeActive}
            className={`${
              !active
                ? "text-yellow-25 underline underline-offset-[10px]"
                : "text-white"
            }`}
          >
            New
          </div>
        </div>
        <div className="w-full ">
          <CourseSlider
            className="m-auto w-full text-center md:text-start "
            Courses={catalogPageData?.selectedCategory?.course}
          />
        </div>
      </div>

      {/* section 3 */}
      <div className="w-full md:w-[90%] flex flex-col gap-10 my-10 m-auto">
        <p className="text-[2rem] font-semibold text-center md:text-start">
          Top courses in other categories
        </p>
        <div>
          <CourseSlider Courses={catalogPageData?.diffCategoryCourses} />
        </div>
      </div>
      <div className="w-full md:w-[90%] flex flex-col gap-10 my-10 m-auto">
        <p className="text-[2rem] font-semibold text-center md:text-start px-2">
          Frequently bought courses
        </p>
        <div className="flex flex-wrap justify-center gap-10 ">
          {catalogPageData?.mostSellingCourses
            ?.slice(0, 4)
            ?.map((course, index) => {
              return <CourseCard key={index} course={course}  />;
            })}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

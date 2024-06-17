import React from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import CourseCard from "./CourseCard";

export default function CourseSlider({ Courses }) {
  return (
    <>
      {Courses?.length === 0 ? (
        <div>No Courses found</div>
      ) : (
        <Swiper
        className="flex justify-center items-center"
          slidesPerView={3}
          spaceBetween={10}
          loop={true}
          freeMode={true}
          speed={1900}
   centeredSlides= {true}
   centeredSlidesBounds= {true}
          autoplay={{
            delay: 2000,

            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
         
          breakpoints={{
            200: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          
        >
          {Courses?.map((course, index) => {
            return (
              <SwiperSlide key={index} className="flex justify-center items-center  w-[500px]">
                <CourseCard course={course} Height={"h-[250px]"}  />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}

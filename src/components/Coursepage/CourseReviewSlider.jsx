import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseReviewCard from "./CourseReviewCard";
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
export default function ReviewSlider({reviews}) {
  

  return (
    <div className="  my-14 w-full  ">
      <div className="text-[2rem] w-full font-semibold m-auto text-center my-4 p-2">
        Reviews About the course
      </div>
      {reviews?.length === 0 ? (
        <div>No Reviews found</div>
      ) : (
        <Swiper
          className="flex justify-center items-center "
          slidesPerView={3}
          spaceBetween={10}
          loop={true}
          freeMode={true}
          speed={1400}
          centeredSlides={true}
          centeredSlidesBounds={true}
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
          {reviews?.map((review, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center  w-[500px]"
              >
                <CourseReviewCard review={review} Height={"h-[250px]"} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}

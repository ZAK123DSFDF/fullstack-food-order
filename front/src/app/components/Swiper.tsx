"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ScrollableData from "./ScrollableData";

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className}" style="background-color: ${
            className.includes("swiper-pagination-bullet-active")
              ? "#e57b0f"
              : "#808080"
          }; width: 12px; height: 12px; border-radius: 50%; margin: 0 4px;"></span>`;
        },
      }}
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <ScrollableData color="#2f2f2f" />
      </SwiperSlide>

      {/* Repeat SwiperSlides as needed */}
      <SwiperSlide>
        {/* Content for Slide 2 */}
        <ScrollableData color="#50482b" />
        {/* Add similar content as the first slide, or new content */}
      </SwiperSlide>

      <SwiperSlide>
        {/* Content for Slide 3 */}
        <ScrollableData color="#296d60" />
        {/* Add similar content as the first slide, or new content */}
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;

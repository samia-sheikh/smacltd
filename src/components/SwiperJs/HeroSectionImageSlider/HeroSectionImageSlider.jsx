import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function HeroSectionImageSlider(images) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  //console.log(images);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs,Navigation]}
        className="mySwiper2"
      >
        {images.images?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.images?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

// Import Autoplay module
import { EffectCreative, Autoplay } from "swiper/modules";

import "./HeroSectionSwiper.css";
import ImageComp from "../globalComponents/ImageComp";

function HeroSectionSwiper({ swiperData }) {
  return (
    <>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        autoplay={{
          delay: 2000, // Time in milliseconds between slides (3 seconds)
          disableOnInteraction: false, // Will keep autoplaying even if the user interacts
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]} // Add Autoplay to modules
      >
        {swiperData?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ImageComp
                src={item?.imagecourse}
                sx={{
                  width: "100%",
                  maxWidth: "684px",
                  borderRadius: "12px",
                  // objectFit: "contain",
                  backgroundColor: "#e4f8f6",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default HeroSectionSwiper;

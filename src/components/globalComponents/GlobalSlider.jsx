import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SingleStory from "../stories/SingleStory";
import { Button } from "@mui/material";
import OtherStories from "./Modals/Story/ViewStory/othersStory";

const GlobalSlider = ({ stories, userDetails, dots, arrows }) => {
  // //console.log(stories,"new story");
  var settings = {
    dots: dots ? true : false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: arrows ? true : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [open, setOpen] = useState(false);
  const [story, setStory] = useState(null);

  const handleStory = (e) => {
    // //console.log("clicked", e);
    setOpen(!open);
    setStory(e);
  };
  return (
    <div>
      <OtherStories open={open} setOpen={setOpen} story={story} />
      <Slider {...settings}>
        {stories?.map((data) => {
          return (
            <Button
              key={data.storyId}
              onClick={() => {
                handleStory(data);
              }}
            >
              <SingleStory data={data} userDetails={userDetails} />
            </Button>
          );
        })}
      </Slider>
    </div>
  );
};

export default GlobalSlider;

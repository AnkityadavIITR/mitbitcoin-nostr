"use client";
import React, { useRef } from "react";
import { useNostrEvents, dateToUnix } from "nostr-react";
import CourseCarousel from "./home/courseCarousel";
import Slider from "react-slick";
import CourseCard from "./courseCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalFeed = () => {
  let sliderRef = useRef(null);
  const play = () => {
    sliderRef.slickPlay();
  };
  const pause = () => {
    sliderRef.slickPause();
  };
  let settings = {
    dots: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  const now = useRef(new Date());

  const currentTime = now.current;
  const twoHoursAgo = new Date(currentTime.getTime() - 7200000); // 7200000 ms is 2 hours
  const twoHoursAgoUnix = Math.floor(twoHoursAgo.getTime() / 1000);

  const { events } = useNostrEvents({
    filter: {
      since: twoHoursAgoUnix,
      kinds: [1], // text_note
    },
  });

  return (
    <div>
      <h1 className="text-[40px] font-bold font-tertiary">Newly Added</h1>
      <Slider
        ref={(slider) => (sliderRef = slider)}
        {...settings}
        className=" text-black"
      >
        {events.map((event) => {
          try {
            const contentObj = JSON.parse(event.content);
            if (
              contentObj &&
              typeof contentObj === "object" &&
              contentObj.hasOwnProperty("id")
            ) {
              const data = JSON.parse(event.content);
              console.log("data = ", data);
              return (
                <>
                  <CourseCard data={data} key={data.id} />
                </>
              );
            }
          } catch (error) {}
          return null;
        })}
      </Slider>
    </div>
  );
};

export default GlobalFeed;

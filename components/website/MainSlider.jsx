"use client";

import React from "react";

import dynamic from "next/dynamic";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";

import slider1 from "@/public/assets/images/slider-1.png";
import slider2 from "@/public/assets/images/slider-2.png";
import slider3 from "@/public/assets/images/slider-3.png";
import slider4 from "@/public/assets/images/slider-4.png";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/* ================= DYNAMIC SLIDER ================= */

const Slider = dynamic(
  () => import("react-slick").then((mod) => mod.default),
  {
    ssr: false,
  }
);

/* ================= NEXT ARROW ================= */

const ArrowNext = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-14 h-14 bg-white shadow-lg flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 right-5"
    >
      <FaArrowRight size={25} className="text-gray-600" />
    </button>
  );
};

/* ================= PREV ARROW ================= */

const ArrowPrev = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-14 h-14 bg-white shadow-lg flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 left-5"
    >
      <FaArrowLeft size={25} className="text-gray-600" />
    </button>
  );
};

function MainSlider() {

  const settings = {

    dots: true,

    infinite: true,

    speed: 500,

    slidesToShow: 1,

    slidesToScroll: 1,

    autoplay: true,

    autoplaySpeed: 3000,

    arrows: true,

    nextArrow: <ArrowNext />,

    prevArrow: <ArrowPrev />,
 
  responsive: [
      {
        breakpoint: 480,
        settings: {
          // slidesToShow: 1,
          // slidesToScroll: 1,
          // infinite: true,
          dots: false,
          arrow:false,
          nextArrow:"",
          prevArrow:""
        }
      },
    ]
    }


  return (

    <div className="w-full overflow-hidden relative">

      <Slider {...settings}>

        <div>
          <Image
            src={slider1}
            alt="slider-1"
            className="w-full h-auto"
            priority
          />
        </div>

        <div>
          <Image
            src={slider2}
            alt="slider-2"
            className="w-full h-auto"
          />
        </div>

        <div>
          <Image
            src={slider3}
            alt="slider-3"
            className="w-full h-auto"
          />
        </div>

        <div>
          <Image
            src={slider4}
            alt="slider-4"
            className="w-full h-auto"
          />
        </div>

      </Slider>

    </div>
  );
}

export default MainSlider;
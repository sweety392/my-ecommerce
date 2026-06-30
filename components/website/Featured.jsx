"use client";

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import {

  useCart,

} from "@/app/context/CartContext";

import Image from "next/image";

import dynamic from "next/dynamic";

import Link from "next/link";

import {
  FaArrowRight,
} from "react-icons/fa";

// ================= DYNAMIC SLIDER =================

const Slider = dynamic(
  () => import("react-slick"),
  {
    ssr: false,
  }
);

// ================= SLICK CSS =================

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

function FeaturedProducts() {

  // ================= STATES =================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
const { addToCart } =
  useCart();
  // ================= GET PRODUCTS =================

  const getProducts =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/get-featured"
          );

        console.log(
          response.data
        );

        // ================= CHECK SUCCESS =================

        if (
          response.data.success
        ) {

          setProducts(
            response.data.products
          );
        }

      } catch (error) {

        console.log(
          "FETCH ERROR:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  // ================= USE EFFECT =================

  useEffect(() => {

    getProducts();

  }, []);

  // ================= SLIDER SETTINGS =================

  const settings = {

    dots: true,

    infinite: true,

    speed: 500,

    slidesToShow: 1,

    slidesToScroll: 3,

    arrows: true,

    autoplay: true,

    autoplaySpeed: 3000,
  };

  return (

    <section
      className="
        w-full
        py-10
        px-4
        md:px-10
        bg-gray-50
      "
    >

      {/* ================= TOP HEADER ================= */}

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >

          Featured Products

        </h2>

        {/* ================= VIEW ALL ================= */}

        <Link href="/products">

          <button
            className="
              flex
              items-center
              gap-2
              text-[#3bb77e]
              font-semibold
            "
          >

            View All

            <FaArrowRight />

          </button>

        </Link>

      </div>

      {/* ================= LOADING ================= */}

      {loading ? (

        <div
          className="
            text-center
            py-20
          "
        >

          <h1
            className="
              text-3xl
              font-bold
            "
          >

            Loading Products...

          </h1>

        </div>

      ) : products.length === 0 ? (

        /* ================= EMPTY PRODUCTS ================= */

        <div
          className="
            text-center
            text-2xl
            font-semibold
            text-gray-500
            py-20
          "
        >

          No Products Found

        </div>

      ) : (

        /* ================= PRODUCT GRID ================= */

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          {products.map((item) => (

            <div
              key={item._id}

              className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-lg
                border
                border-gray-100
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >

              {/* ================= IMAGE SLIDER ================= */}

              <div className="w-full">

                <Slider {...settings}>

                  {item.images?.map(
                    (img, index) => (

                      <div key={index}>

                        <div
                          className="
                            relative
                            w-full
                            h-[250px]
                          "
                        >

                          <Image
                            src={
                              img?.url ||
                              "/placeholder.png"
                            }

                            alt={
                              item.title
                            }

                            fill

                            sizes="
                              (max-width: 768px) 100vw,
                              (max-width: 1200px) 50vw,
                              25vw
                            "

                            className="
                              object-cover
                            "
                          />

                        </div>
                     <button
  onClick={() =>
    addToCart(item)
  }

  className="
    mt-4
    w-full
    bg-[#3bb77e]
    hover:bg-[#2ea76d]
    text-white
    py-2
    rounded-xl
    font-semibold
  "
>

  Add To Cart

</button>
                       
                      </div>
                    )
                  )}

                </Slider>

              </div>

              {/* ================= DETAILS ================= */}

              <div className="p-4">

                {/* ================= BRAND ================= */}

                <p
                  className="
                    text-sm
                    text-gray-500
                    mb-1
                  "
                >

                  {item.brand}

                </p>

                {/* ================= TITLE ================= */}

                <h3
                  className="
                    text-lg
                    font-semibold
                    mb-2
                  "
                >

                  {item.title}

                </h3>

                {/* ================= PRICE ================= */}

                <p
                  className="
                    text-2xl
                    font-bold
                    text-[#3bb77e]
                  "
                >

                  ₹{item.price}

                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default FeaturedProducts;
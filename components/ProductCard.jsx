"use client";

import { useState } from "react";

import Image from "next/image";

export default function ProductCard({

  product,

}) {

  // CURRENT IMAGE

  const [currentImage, setCurrentImage] =
    useState(0);

  return (

    <div className="w-[300px] border rounded-xl overflow-hidden shadow-lg p-4">

      {/* PRODUCT IMAGE */}

      <div className="relative w-full h-[250px]">

        <Image
          src={
            product.images[currentImage].url
          }
          alt="product"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* DOTS */}

      <div className="flex justify-center gap-2 mt-4">

        {product.images.map((img, index) => (

          <button
            key={index}

            onClick={() =>
              setCurrentImage(index)
            }

            className={`w-3 h-3 rounded-full ${
              currentImage === index
                ? "bg-black"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* DETAILS */}

      <div className="mt-4">

        <h2 className="text-lg font-bold">

          {product.title}

        </h2>

        <p className="text-green-600 font-semibold">

          ₹ {product.price}

        </p>
      </div>
    </div>
  );
}
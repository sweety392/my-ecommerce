"use client";

import { useState } from "react";

import Image from "next/image";

export default function ProductGallery({
  images,
}) {

  // CURRENT IMAGE

  const [selectedImage, setSelectedImage] =
    useState(0);

  return (
    <div className="flex flex-col gap-4">

      {/* MAIN IMAGE */}

      <div className="relative w-[400px] h-[400px] border rounded-lg overflow-hidden">

        <Image
          src={images[selectedImage].url}
          alt="product"
          fill
          className="object-cover"
        />
      </div>

      {/* DOTS */}

      <div className="flex justify-center gap-3">

        {images.map((img, index) => (

          <button
            key={index}
            onClick={() =>
              setSelectedImage(index)
            }
            className={`w-4 h-4 rounded-full ${
              selectedImage === index
                ? "bg-black"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* THUMBNAILS */}

      <div className="flex gap-3">

        {images.map((img, index) => (

          <div
            key={index}
            onClick={() =>
              setSelectedImage(index)
            }
            className={`relative w-20 h-20 border rounded cursor-pointer overflow-hidden ${
              selectedImage === index
                ? "border-green-500"
                : "border-gray-300"
            }`}
          >

            <Image
              src={img.url}
              alt="thumb"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
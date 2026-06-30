"use client";

import { useState } from "react";

import axios from "axios";

export default function AddProductPage() {

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [images, setImages] =
    useState([]);

  // ================= HANDLE IMAGES =================

  const handleImages = (e) => {

    setImages([...e.target.files]);
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append("price", price);

    // MULTIPLE IMAGES

    images.forEach((img) => {

      formData.append("images", img);
    });

    try {

      const response =
        await axios.post(
          "/api/products/add-product",
          formData
        );

      console.log(response.data);

      alert("Product Added");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="p-10">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md"
      >

        <input
          type="text"
          placeholder="Product Title"
          className="border p-3"
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3"
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        {/* MULTIPLE IMAGE INPUT */}

        <input
          type="file"
          multiple
          className="border p-3"
          onChange={handleImages}
        />

        <button
          type="submit"
          className="bg-black text-white p-3"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
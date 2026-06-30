"use client";

import { useState } from "react";

import axios from "axios";

export default function ProductForm() {

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

    await axios.post(
      "/api/products/add-product",
      formData
    );

    alert("Product Added");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >

      <input
        type="text"
        placeholder="Title"
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Price"
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      {/* MULTIPLE IMAGE INPUT */}

      <input
        type="file"
        multiple
        onChange={handleImages}
      />

      <button type="submit">
        Add Product
      </button>
    </form>
  );
}
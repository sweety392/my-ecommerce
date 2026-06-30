"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import dynamic from "next/dynamic";

// ================= DYNAMIC SLIDER =================
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// ================= SLICK CSS =================
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SearchResultContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; // URL se query parameter uthane ke liye

  // ================= STATES =================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  // ================= FETCH PRODUCTS FROM BACKEND =================
  useEffect(() => {
    const fetchSearchedProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);
        // 🛠️ Backend API call aapki search query ke sath
        const response = await axios.get(`/api/search-products?query=${encodeURIComponent(query.trim())}`);
        
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("SEARCH FETCH ERROR:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchedProducts();
  }, [query]); // Jab bhi URL ki query badlegi, API dobara hit hogi

  // ================= SLIDER SETTINGS =================
  const settings = {
    dots: true,
    infinite: products.length > 1, // Agar 1 hi image ho toh crash na ho
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="w-full py-10 px-4 md:px-10 bg-gray-50 text-black min-h-screen">
      {/* Top Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Search Results for: <span className="text-[#3bb77e]">"{query}"</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">{products.length} products found</p>
      </div>

      {/* ================= LOADING STATE ================= */}
      {loading ? (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold animate-pulse text-gray-600">
            Searching Products...
          </h1>
        </div>
      ) : products.length === 0 ? (
        /* ================= EMPTY STATE ================= */
        <div className="text-center text-2xl font-semibold text-gray-500 py-20">
          No Products Found Matching Your Search
        </div>
      ) : (
        /* ================= PRODUCT GRID (Same as Featured) ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Slider */}
              <div className="w-full relative group">
                {item.images && item.images.length > 0 ? (
                  <Slider {...settings}>
                    {item.images.map((img, index) => (
                      <div key={index} className="relative w-full h-[250px]">
                        <Image
                          src={img?.url || "/placeholder.png"}
                          alt={item.title || "Product Image"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="relative w-full h-[250px]">
                    <Image
                      src="/placeholder.png"
                      alt="Placeholder"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Details Block */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-[#3bb77e] mb-4">
                    ₹{item.price}
                  </p>
                  
                  {/* Add To Cart Button */}
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-[#3bb77e] hover:bg-[#2ea76d] text-white py-2.5 rounded-xl font-semibold transition-colors duration-200"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// Main component with Suspense protection for Next.js build
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-black">Loading Page...</div>}>
      <SearchResultContent />
    </Suspense>
  );
}
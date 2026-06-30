"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useDebounce } from "@/app/hooks/useDebounce"; // Aapka custom hook
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const { cartItems } = useCart();
  const dropdownRef = useRef(null); // Dropdown ke bahar click detect karne ke liye

  // ================= STATES =================
  const[searchQuery , setSearchQuery] = useState("");
  const[showDropDown , setShowDropDown] =useState(false);
  const[showSearchBox ,setSearchBoxShow]=useState(false)
  const[suggestions , setSuggestions] =useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  const debouncedSearchValue = useDebounce(searchQuery,400)
  useEffect(()=>{
    const fetchLiveSuggestions = async ()=>{
      if(!debouncedSearchValue .trim()){
        setLoadingSuggestions([]);
        setShowDropDown(false);
        return;

      }
    
    try{
      setLoadingSuggestions(true);
      const response = await axios.get(`/api/search-products?query=${encodeURIComponent(debouncedSearchValue.trim())}`);
      if(response.data.success){
        setSuggestions(response.data.products.slice(0,5))
        
        setShowDropDown(true)
        setLoadingSuggestions(true)

      }

    }catch(error){
      console.log('fetching error',error)

    }finally{
      setLoadingSuggestions(false)
    }
  }
  fetchLiveSuggestions();

  },[debouncedSearchValue, router])
  // Click Outside Logic: Agar user dropdown ke bahar kahin bhi click kare toh window band ho jaye
 
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // ================= SUBMIT LOGIC (ENTER KEY) =================
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropDown(false);
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full border-b bg-white shadow-sm px-4 md:px-10">
      <div className="h-[80px] flex items-center justify-between">
        
        {/* LEFT SIDE (LOGO & MENU) */}
        <div className="flex items-center gap-10">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                src="/assets/images/logo-black.png"
                alt="eStore Logo"
                width={70}
                height={70}
                loading="eager"
                className="object-contain w-auto h-auto"
              />
              
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-[16px] font-medium text-gray-700">
            <Link href="/"><li className="cursor-pointer hover:text-black transition">Home</li></Link>
            <li className="cursor-pointer hover:text-black transition">About</li>
            <li className="cursor-pointer hover:text-black transition">Shop</li>
          </ul>
        </div>

        {/* RIGHT SIDE (SEARCH, CART, USER) */}
        <div className="flex items-center gap-5">
          
          {/* SEARCH FUNCTIONALITY WITH SUGGESTIONS WINDOW */}
          <div className="relative flex items-center gap-2" ref={dropdownRef}>
            {showSearchBox && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2 md:static md:translate-y-0 z-50">
                <form submit={handleSearchSubmit}className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                   onChange={(e)=>setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.trim() && setShowDropDown(true)}
                    placeholder="Search products..."
                    className="w-[200px] md:w-[280px] border border-gray-300 rounded-full pl-4 pr-10 py-1.5 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                    <Search size={16} />
                  </button>
                </form>

                {/* 🚨 LIVE SUGGESTIONS DROPDOWN WINDOW 🚨 */}
                {showDropDown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-[999] overflow-hidden max-h-[350px] w-[200px] md:w-[280px]">
                    
                    {loadingSuggestions && (
                      <div className="p-3 text-xs text-gray-500 text-center animate-pulse">Searching matching products...</div>
                    )}

                    {!loadingSuggestions && suggestions.length === 0 && (
                      <div className="p-3 text-xs text-gray-500 text-center">No products match.</div>
                    )}

                    {!loadingSuggestions && suggestions.map((product) => (
                      <div
                        key={product._id}




























                        
                        onClick={() => {
                          setSearchQuery(product.title);
                          setShowDropDown(false);
                          router.push(`/search?query=${encodeURIComponent(product.title)}`);
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none transition-colors"
                      >
                        {/* Product Image Thumb */}
                        <div className="relative w-10 h-10 min-w-[40px] rounded-lg overflow-hidden border bg-gray-100">
                          <Image
                            src={product.images?.[0]?.url || "/placeholder.png"}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Product Info */}
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-gray-800 truncate">{product.title}</span>
                          <span className="text-xs font-bold text-[#3bb77e]">₹{product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Toggle Icon Button */}
            <button
              onClick={() => {
                setSearchBoxShow(!showSearchBox);
                if (showSearchBox) {
                  setSearchQuery("");
                  setSuggestions([]);
                  setShowDropDown(false);
                }
              }}
              className="hover:scale-110 transition-transform z-50"
            >
              {showSearchBox ? <X size={22} className="text-gray-500" /> : <Search size={22} />}
            </button>
          </div>

          {/* CART & USER */}
          <Link href="/cart">
            <button className="relative hover:scale-110 transition-transform">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
          </Link>

          <Link href="/authlogin">
            <button className="hover:scale-110 transition-transform"><User size={22} /></button>
          </Link>

          <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden">
            {openMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
}
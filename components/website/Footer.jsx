"use client";

import Link from "next/link";



export default function Footer() {

  return (

    <footer
      className="
        w-full
        bg-black
        text-white
        pt-16
        pb-8
        px-5
        md:px-10
        mt-20
      "
    >

      {/* ================= TOP SECTION ================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-10
          border-b
          border-gray-700
          pb-12
        "
      >

        {/* ================= BRAND INFO ================= */}

        <div>

          <h1
            className="
              text-3xl
              font-bold
              mb-5
            "
          >

            eStore

          </h1>

          <p
            className="
              text-gray-400
              leading-7
            "
          >

            Discover premium fashion,
            oversized t-shirts, hoodies,
            and modern streetwear styles
            crafted for comfort and trend.

          </p>

          {/* ================= SOCIAL ICONS ================= */}

          <div
            className="
              flex
              items-center
              gap-4
              mt-6
            "
          >

            {/* FACEBOOK */}

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                hover:bg-white
                hover:text-black
                transition
                cursor-pointer
              "
            >

              
            </div>

            {/* INSTAGRAM */}

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                hover:bg-white
                hover:text-black
                transition
                cursor-pointer
              "
            >

             
            </div>

            {/* TWITTER */}

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                hover:bg-white
                hover:text-black
                transition
                cursor-pointer
              "
            >

             
            </div>

            {/* YOUTUBE */}

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                flex
                items-center
                justify-center
                hover:bg-white
                hover:text-black
                transition
                cursor-pointer
              "
            >

              

            </div>

          </div>

        </div>

        {/* ================= QUICK LINKS ================= */}

        <div>

          <h2
            className="
              text-xl
              font-semibold
              mb-5
            "
          >

            Quick Links

          </h2>

          <ul
            className="
              space-y-4
              text-gray-400
            "
          >

            <li>

              <Link href="/">

                Home

              </Link>

            </li>

            <li>

              <Link href="/shop">

                Shop

              </Link>

            </li>

            <li>

              <Link href="/about">

                About Us

              </Link>

            </li>

            <li>

              <Link href="/contact">

                Contact

              </Link>

            </li>

            <li>

              <Link href="/cart">

                Cart

              </Link>

            </li>

          </ul>

        </div>

        {/* ================= CATEGORIES ================= */}

        <div>

          <h2
            className="
              text-xl
              font-semibold
              mb-5
            "
          >

            Categories

          </h2>

          <ul
            className="
              space-y-4
              text-gray-400
            "
          >

            <li>T-Shirts</li>

            <li>Oversized</li>

            <li>Hoodies</li>

            <li>Streetwear</li>

            <li>New Arrivals</li>

          </ul>

        </div>

        {/* ================= CONTACT INFO ================= */}

        <div>

          <h2
            className="
              text-xl
              font-semibold
              mb-5
            "
          >

            Contact Us

          </h2>

          <div
            className="
              flex
              flex-col
              gap-5
              text-gray-400
            "
          >

            {/* ADDRESS */}

            <div
              className="
                flex
                items-start
                gap-3
              "
            >

              

              <p>

                New Delhi, India

              </p>

            </div>

            {/* PHONE */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

             

              <p>

                +91 9876543210

              </p>

            </div>

            {/* EMAIL */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              

              <p>

                support@estore.com

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-4
          pt-8
          text-gray-500
          text-sm
        "
      >

        <p>

          © 2026 eStore. All Rights Reserved.

        </p>

        <div
          className="
            flex
            items-center
            gap-6
          "
        >

          <p>Privacy Policy</p>

          <p>Terms & Conditions</p>

        </div>

      </div>

    </footer>
  );
}
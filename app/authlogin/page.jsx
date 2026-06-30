"use client";

import Link from "next/link";

import Image from "next/image";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

import {
  FaGoogle,
  FaGithub,
  FaUserCircle,
} from "react-icons/fa";

export default function LoginPage() {

  // ================= SESSION =================

  const { data: session } =
    useSession();

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-gray-100
        to-gray-200
        px-4
      "
    >

      {/* ================= CARD ================= */}

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
        "
      >

        {/* ================= HEADER ================= */}

        <div className="text-center mb-8">

          <div
            className="
              flex
              justify-center
              mb-4
            "
          >

            <FaUserCircle
              className="
                text-7xl
                text-[#3bb77e]
              "
            />

          </div>

          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >

            Welcome Back

          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            Login to continue shopping

          </p>

        </div>

        {/* ================= IF LOGGED IN ================= */}

        {session ? (

          <div
            className="
              flex
              flex-col
              items-center
              gap-5
            "
          >

            {/* USER IMAGE */}

            <Image
              src={
                session.user.image
              }

              alt="user"

              width={100}

              height={100}

              className="
                rounded-full
                border-4
                border-[#3bb77e]
              "
            />

            {/* USER NAME */}

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >

              {session.user.name}

            </h2>

            {/* USER EMAIL */}

            <p className="text-gray-500">

              {session.user.email}

            </p>

            {/* LOGOUT BUTTON */}

            <button
              onClick={() =>
                signOut()
              }

              className="
                w-full
                bg-red-500
                hover:bg-red-600
                text-white
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-300
              "
            >

              Logout

            </button>

          </div>

        ) : (

          <div className="space-y-4">

            {/* ================= GOOGLE BUTTON ================= */}

            <button
              onClick={()=>signIn("google")}
              

              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                border
                border-gray-300
                py-3
                rounded-xl
                font-medium
                hover:bg-gray-100
                transition-all
                duration-300
              "
            >

              <FaGoogle
                className="
                  text-red-500
                  text-xl
                "
              />

              Continue with Google

            </button>

            {/* ================= GITHUB BUTTON ================= */}

            <button
              onClick={() =>
                signIn("github")
              }

              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                bg-black
                text-white
                py-3
                rounded-xl
                font-medium
                hover:opacity-90
                transition-all
                duration-300
              "
            >

              <FaGithub
                className="
                  text-xl
                "
              />

              Continue with GitHub

            </button>

            {/* ================= DIVIDER ================= */}

            <div
              className="
                flex
                items-center
                gap-3
                py-3
              "
            >

              <div
                className="
                  flex-1
                  h-[1px]
                  bg-gray-300
                "
              />

              <span
                className="
                  text-sm
                  text-gray-400
                "
              >

                OR

              </span>

              <div
                className="
                  flex-1
                  h-[1px]
                  bg-gray-300
                "
              />

            </div>

            {/* ================= EMAIL LOGIN ================= */}

            <Link href="/auth/login">

              <button
                className="
                  w-full
                  bg-[#3bb77e]
                  hover:bg-[#2ea76d]
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-300
                "
              >

                Login With Email

              </button>

            </Link>

            {/* ================= REGISTER ================= */}

            <div className="text-center pt-2">

              <p className="text-gray-600">

                Don’t have an account?

              </p>

              <Link href="/auth/register">

                <button
                  className="
                    mt-3
                    w-full
                    border
                    border-[#3bb77e]
                    text-[#3bb77e]
                    hover:bg-[#3bb77e]
                    hover:text-white
                    py-3
                    rounded-xl
                    font-semibold
                    transition-all
                    duration-300
                  "
                >

                  Create Your Account

                </button>

              </Link>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
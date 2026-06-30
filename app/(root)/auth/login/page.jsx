"use client";

import React, {
  useState,
} from "react";

import axios from "axios";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  FaGoogle,
  FaGithub,
  FaUserCircle,
} from "react-icons/fa";

import {
  signIn,
} from "next-auth/react";

export default function LoginPage() {

  // ================= ROUTER =================

  const router =
    useRouter();

  // ================= STATES =================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= LOGIN FUNCTION =================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        // ================= START LOADING =================

        setLoading(true);

        setMessage("");

        // ================= API CALL =================

        const response =
          await axios.post(

            "/api/auth/login",

            {
              email,
              password,
            }
          );

        console.log(
          "LOGIN RESPONSE:",
          response.data
        );

        // ================= SUCCESS =================

        if (
          response.data.success
        ) {

          setMessage(
            "Login Success ✅"
          );

          // ================= ROLE CHECK =================

          if (
            response.data.user
              .role === "admin"
          ) {

            // ================= ADMIN =================

            router.push(
              "/admin/dashboard"
            );

          } else {

            // ================= USER =================

            router.push("/");
          }

        } else {

          // ================= FAILED =================

          setMessage(
            response.data.message
          );
        }

      } catch (error) {

        // ================= ERROR =================

        console.log(
          "FULL ERROR:",
          error
        );

        setMessage(

          error.response?.data
            ?.message ||

          "Something went wrong"
        );

      } finally {

        // ================= STOP LOADING =================

        setLoading(false);
      }
    };

  return (

    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-gradient-to-br
        from-gray-100
        to-gray-200
        px-4
      "
    >

      <div
        className="
          bg-white
          p-8
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
        "
      >

        {/* ================= HEADER ================= */}

        <div className="text-center mb-8">

          <div className="flex justify-center mb-4">

            <FaUserCircle
              className="
                text-7xl
                text-purple-600
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

        {/* ================= LOGIN FORM ================= */}

        <form
          onSubmit={
            handleLogin
          }
        >

          {/* ================= EMAIL ================= */}

          <input
            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full
              h-12
              border
              border-gray-300
              rounded-xl
              px-4
              mb-4
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* ================= PASSWORD ================= */}

          <input
            type="password"

            placeholder="Enter Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              h-12
              border
              border-gray-300
              rounded-xl
              px-4
              mb-4
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* ================= LOGIN BUTTON ================= */}

          <button
            type="submit"

            disabled={loading}

            className="
              w-full
              h-12
              bg-purple-600
              hover:bg-purple-700
              rounded-xl
              text-white
              font-semibold
              transition-all
              duration-300
            "
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        {/* ================= MESSAGE ================= */}

        {message && (

          <p
            className="
              text-center
              text-sm
              mt-4
              text-purple-600
              font-medium
            "
          >

            {message}

          </p>
        )}

        {/* ================= DIVIDER ================= */}

        <div
          className="
            flex
            items-center
            gap-3
            py-5
          "
        >

          <div className="flex-1 h-[1px] bg-gray-300" />

          <span
            className="
              text-sm
              text-gray-400
            "
          >
            OR
          </span>

          <div className="flex-1 h-[1px] bg-gray-300" />

        </div>

        {/* ================= GOOGLE LOGIN ================= */}

        <button
          onClick={() =>
            signIn("google")
          }

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
            mb-4
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

        {/* ================= GITHUB LOGIN ================= */}

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

        {/* ================= REGISTER ================= */}

        <div className="text-center mt-6">

          <p className="text-gray-600">

            Don’t have an account?

          </p>

          <Link href="/register">

            <button
              className="
                mt-3
                w-full
                border
                border-purple-600
                text-purple-600
                hover:bg-purple-600
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

    </div>
  );
}
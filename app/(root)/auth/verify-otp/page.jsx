"use client";

import React, {
  useState,
} from "react";

import axios from "axios";

import {
  useRouter,
} from "next/navigation";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

// ================= COMPONENT =================

export default function VerifyOTPPage() {

  const router = useRouter();

  // ================= STATES =================

  const [otp, setOtp] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= GET EMAIL =================

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "email"
        )
      : "";

  // ================= VERIFY OTP FUNCTION =================

  const handleVerifyOTP =
    async () => {

      try {

        setLoading(true);

        setMessage("");

        // ================= OTP VALIDATION =================

        if (otp.length !== 6) {

          setMessage(
            "OTP must be 6 digits"
          );

          setLoading(false);

          return;
        }

        // ================= API CALL =================

        const response =
          await axios.post(
            "/api/auth/verify-otp",
            {
              email,
              otp,
            }
          );

        // ================= SUCCESS =================

        if (
          response.data.success
        ) {

          setMessage(
            "Login Successful ✅"
          );

          // ================= REDIRECT =================

          setTimeout(() => {

            router.push("/");

          }, 1500);

        } else {

          setMessage(
            response.data.message
          );
        }

      } catch (error) {

        setMessage(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    };

  // ================= RESEND OTP FUNCTION =================

  const handleResendOtp =
    async () => {

      try {

        setMessage("");

        // ================= CHECK EMAIL =================

        if (!email) {

          setMessage(
            "Email not found"
          );

          return;
        }

        // ================= API CALL =================

        const response =
          await axios.post(
            "/api/auth/resend-otp",
            {
              email,
            }
          );

        // ================= SUCCESS =================

        if (
          response.data.success
        ) {

          setMessage(
            "New OTP sent successfully ✅"
          );

        } else {

          setMessage(
            response.data.message
          );
        }

      } catch (error) {

        setMessage(
          error.response?.data
            ?.message ||
            "Failed to resend OTP"
        );

        console.log(error);
      }
    };

  // ================= UI =================

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <Card className="w-full max-w-md shadow-2xl rounded-2xl">

        <CardContent className="p-8">

          {/* ================= HEADING ================= */}

          <h1 className="text-3xl font-bold text-center mb-2">

            Verify OTP

          </h1>

          <p className="text-center text-gray-500 mb-6">

            Enter OTP sent to your email

          </p>

          {/* ================= OTP INPUT ================= */}

          <input
            type="text"

            placeholder="Enter OTP"

            value={otp}

            onChange={(e) =>
              setOtp(
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
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* ================= VERIFY BUTTON ================= */}

          <button
            onClick={
              handleVerifyOTP
            }

            disabled={loading}

            className="
              w-full
              h-12
              bg-purple-600
              hover:bg-purple-700
              rounded-xl
              text-white
              font-semibold
              mt-5
            "
          >

            {loading
              ? "Verifying..."
              : "Verify OTP"}

          </button>

          {/* ================= MESSAGE ================= */}

          {message && (

            <p className="text-center text-sm mt-4 text-purple-600 font-medium">

              {message}

            </p>

          )}

          {/* ================= RESEND OTP ================= */}

          <p
            onClick={
              handleResendOtp
            }

            className="
              text-green-500
              underline
              cursor-pointer
              text-center
              mt-4
            "
          >

            Resend OTP

          </p>

        </CardContent>

      </Card>

    </div>
  );
}
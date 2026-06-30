"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/public/assets/images/logo-black.png";

import axios from "axios";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
} from "lucide-react";

import Link from "next/link";

// ================= ZOD SCHEMA =================

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password is required"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ================= TYPES =================


// ================= COMPONENT =================

function RegisterPage() {

  // ================= STATES =================

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  // ================= REACT HOOK FORM =================

  
  // ================= SUBMIT FUNCTION =================

 const {
  register,
  handleSubmit,
  reset,
  formState: {
    errors,
    isSubmitting,
  },
} = useForm({
  resolver: zodResolver(registerSchema),
});

const onSubmit = async (data) => {
  try {

    const response = await axios.post(
      "/api/auth/register",
      data
    );

    const registerResponse = response.data;

    if (!registerResponse.success) {
      throw new Error(registerResponse.message);
    }

    alert(registerResponse.message);

    reset();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <Card className="w-full max-w-[450px] rounded-3xl shadow-2xl border-0">

        <CardContent className="p-8">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src={logo}
              alt="logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-black mb-2">
            Create Your Account
          </h1>

          {/* Sub Heading */}
          <p className="text-center text-gray-500 text-sm mb-8">
            Fill out the form below to create your account
          </p>

          {/* FORM */}
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* Full Name */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("fullName")}
                  className="w-full h-12 border border-gray-300 rounded-xl pl-10 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}

            </div>

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email")}
                  className="w-full h-12 border border-gray-300 rounded-xl pl-10 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full h-12 border border-gray-300 rounded-xl pl-10 pr-12 outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* Confirm Password */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className="w-full h-12 border border-gray-300 rounded-xl pl-10 pr-12 outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}

            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 transition-all duration-300 rounded-xl text-white font-semibold text-lg flex justify-center items-center"
            >
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                "Register"
              )}
            </button>

          </form>

          {/* Bottom Text */}
          <div className="text-center mt-6">

            <p className="text-gray-500 text-sm">
              Already have an account?
            </p>

            <Link href="/auth/login">
              <h3 className="text-purple-600 font-semibold mt-1 hover:underline">
                Login Here
              </h3>
            </Link>

          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;
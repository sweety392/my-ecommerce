// app/api/auth/resend-otp/route.js

import dbConnect from "@/lib/databaseConnection";

import UserModel from "@/model/user.model";

import { NextResponse } from "next/server";

import crypto from "crypto";

import nodemailer from "nodemailer";

export async function POST(request) {

  try {

    // ================= DATABASE CONNECT =================

    await dbConnect();

    // ================= GET BODY =================

    const body = await request.json();

    const { email } = body;

    // ================= CHECK EMAIL =================

    if (!email) {

      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    // ================= FIND USER =================

    const user = await UserModel.findOne({ email });

    // ================= CHECK USER =================

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // ================= GENERATE NEW OTP =================

    const newOtp = crypto.randomInt(100000, 999999).toString();

    // ================= OTP EXPIRY =================

    const otpExpiry = Date.now() + 10 * 60 * 1000;

    // ================= SAVE OTP =================

    user.verifyOtp = newOtp;

    user.verifyOtpExpiry = otpExpiry;

    await user.save();

    // ================= NODEMAILER TRANSPORTER =================

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {

        user: process.env.NODEMAILER_EMAIL,

        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // ================= EMAIL OPTIONS =================

    const mailOptions = {

      from: process.env.NODEMAILER_EMAIL,

      to: email,

      subject: "Resend OTP",

      html: `
        <h1>Your New OTP</h1>

        <h2>${newOtp}</h2>

        <p>This OTP will expire in 10 minutes.</p>
      `,
    };

    // ================= SEND EMAIL =================

    await transporter.sendMail(mailOptions);

    // ================= RESPONSE =================

    return NextResponse.json(
      {
        success: true,
        message: "New OTP sent successfully",
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
// app/api/auth/send-otp/route.js

import dbConnect from "@/lib/databaseConnection";

import OTPModel from "@/model/otp.model";

import { sendMail } from "@/lib/sendMail";

export async function POST(request) {

  try {

    // ================= DATABASE CONNECT =================

    await dbConnect();

    // ================= GET REQUEST BODY =================

    const body = await request.json();

    const { email } = body;

    // ================= CHECK EMAIL =================

    if (!email) {

      return Response.json(
        {
          success: false,
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    // ================= GENERATE OTP =================

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // ================= DELETE OLD OTP =================

    await OTPModel.deleteMany({
      email,
    });

    // ================= SAVE NEW OTP =================

    await OTPModel.create({

      email,

      otp,

      expiresAt: new Date(
        Date.now() + 5 * 60 * 1000
      ),

    });

    // ================= SEND OTP EMAIL =================

    await sendMail(

      email,

      "Your OTP Code",

      `
        <div
          style="
            font-family:sans-serif;
            padding:20px;
          "
        >

          <h1>
            OTP Verification
          </h1>

          <p>
            Your OTP code is:
          </p>

          <h2 style="color:blue">
            ${otp}
          </h2>

          <p>
            This OTP will expire
            in 5 minutes.
          </p>

        </div>
      `
    );

    // ================= SUCCESS RESPONSE =================

    return Response.json(
      {
        success: true,
        message: "OTP sent successfully",
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.log(
      "SEND_OTP_ERROR:",
      error
    );

    // ================= ERROR RESPONSE =================

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
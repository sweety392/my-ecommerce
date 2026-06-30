import dbConnect from "@/lib/databaseConnection";

import OTPModel from "@/model/otp.model";

export async function POST(request) {

  try {

    await dbConnect();

    const body = await request.json();

    const { email, otp } = body;

    const otpData =
      await OTPModel.findOne({
        email,
        otp,
      });

    if (!otpData) {

      return Response.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (
      otpData.expiresAt < new Date()
    ) {

      return Response.json({
        success: false,
        message: "OTP Expired",
      });
    }

    await OTPModel.deleteMany({
      email,
    });

    return Response.json({
      success: true,
      message: "Login Successful",
    });

  } catch (error) {

    return Response.json({
      success: false,
      message: error.message,
    });
  }
}
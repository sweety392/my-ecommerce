// app/api/auth/verify-email/route.js

import dbConnect from "@/lib/databaseConnection";

import UserModel from "@/model/user.model";

import { jwtVerify } from "jose";

export async function POST(request) {

  try {

    // ================= DATABASE CONNECT =================

    await dbConnect();

    // ================= GET BODY =================

    const body = await request.json();

    const { token } = body;

    // ================= CHECK TOKEN =================

    if (!token) {

      return Response.json(
        {
          success: false,
          message: "Token missing",
        },
        {
          status: 400,
        }
      );
    }

    // ================= SECRET KEY =================

    const secret = new TextEncoder().encode(
      process.env.SECRET_KEY
    );

    // ================= VERIFY JWT =================

    let payload;

    try {

      const verified = await jwtVerify(
        token,
        secret
      );

      payload = verified.payload;

    } catch (error) {

      return Response.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        {
          status: 401,
        }
      );
    }

    // ================= GET USER ID =================

    const userId = payload.user_id;

    // ================= CHECK USER ID =================

    if (!userId) {

      return Response.json(
        {
          success: false,
          message: "User ID missing in token",
        },
        {
          status: 400,
        }
      );
    }

    // ================= FIND USER =================

    const user = await UserModel.findById(
      userId
    );

    // ================= USER NOT FOUND =================

    if (!user) {

      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // ================= ALREADY VERIFIED =================

    if (user.isVerified) {

      return Response.json(
        {
          success: true,
          message: "Email already verified",
        },
        {
          status: 200,
        }
      );
    }

    // ================= UPDATE USER =================

    user.isVerified = true;

    await user.save();

    // ================= SUCCESS RESPONSE =================

    return Response.json(
      {
        success: true,
        message:
          "Email verification successful",
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.log(
      "VERIFY_EMAIL_ERROR:",
      error
    );

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
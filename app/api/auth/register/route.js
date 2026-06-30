import dbConnect from "@/lib/databaseConnection";
import { emailVerificationLink } from "@/lib/email/emailVerification";
import UserModel from "@/model/user.model";
import { registerSchema } from "@/schemas/user.schema";
import { SignJWT } from "jose";
import { sendMail } from "@/lib/sendMail";

export async function POST(request) {
  try {
    // ================= DATABASE CONNECT =================
    await dbConnect();

    // ================= GET BODY =================
    const body = await request.json();

    // ================= ZOD VALIDATION =================
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    // ================= VALIDATED DATA =================
    const validatedData = result.data;

    // ================= CHECK EXISTING USER =================
    const existingUser = await UserModel.findOne({
      email: validatedData.email,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 409,
        }
      );
    }

    // ================= CREATE USER =================
   const user = await UserModel.create({
  fullName: validatedData.fullName,
  email: validatedData.email,
  password: validatedData.password,
   role: "user",
});
    // ================= GENERATE JWT TOKEN =================
    const secret = new TextEncoder().encode(
      process.env.SECRET_KEY
    );

    const token = await new SignJWT({
  user_id: user._id.toString(),
})
  .setProtectedHeader({
    alg: "HS256",
  })
  .setIssuedAt()
  .setExpirationTime("1h")
  .sign(secret);

    // ================= VERIFY EMAIL URL =================
    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`;

    // ================= SEND EMAIL =================
    await sendMail(
      "Verify Your Email", // subject
      validatedData.email, // receiver
      emailVerificationLink(verifyUrl) // body
    );

    // ================= FINAL RESPONSE =================
    return Response.json(
      {
        success: true,
        message:
          "Registration successful. Please verify your email.",
        data: user,
      },
      {
        status: 201,
      }
    );

 
  } catch (error) {
    console.log("REGISTER_ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
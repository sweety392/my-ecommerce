import dbConnect from "@/lib/databaseConnection";

import UserModel from "@/model/user.model";

export async function POST(request) {

  try {

    // ================= DATABASE CONNECT =================

    await dbConnect();

    // ================= GET BODY DATA =================

    const body =
      await request.json();

    const {
      email,
      password,
    } = body;

    // ================= CHECK EMAIL =================

    const user =
      await UserModel.findOne({
        email,
      });

    // ================= USER NOT FOUND =================

    if (!user) {

      return Response.json({

        success: false,

        message:
          "User not found",
      });
    }

    // ================= EMAIL VERIFICATION CHECK =================

    

    // ================= PASSWORD CHECK =================

    const isPasswordCorrect =

      password ===
      user.password;

    // ================= INVALID PASSWORD =================

    if (!isPasswordCorrect) {

      return Response.json({

        success: false,

        message:
          "Invalid Password",
      });
    }

    // ================= LOGIN SUCCESS =================

    return Response.json({

      success: true,

      message:
        "Login Success",

      user: {

        id:
          user._id,

        fullName:
          user.fullName,

        email:
          user.email,

        role:
          user.role,

        isVerified:
          user.isVerified,
      },
    });

  } catch (error) {

    console.log(
      "LOGIN ERROR:",
      error
    );

    return Response.json({

      success: false,

      message:
        error.message ||
        "Something went wrong",
    });
  }
}
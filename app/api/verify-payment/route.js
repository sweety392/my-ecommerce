import crypto from "crypto";

import {
  NextResponse,
} from "next/server";

export async function POST(
  request
) {

  try {

    const body =
      await request.json();

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

    } = body;

    const sign =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expected =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(sign)
        .digest("hex");

    const isValid =
      expected ===
      razorpay_signature;

    if (!isValid) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Signature",
        },
        {
          status: 400,
        }
      );

    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Payment Verified",
      }
    );

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

}
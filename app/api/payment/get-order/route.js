import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// 1. Razorpay ko initialize karein (Donon keys hona zaroori hai)
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    // 2. Frontend se amount nikaalein
    const { amount } = await req.json();

    if (!amount) {
      return NextResponse.json(
        { success: false, message: "Amount is required" },
        { status: 400 }
      );
    }

    // 3. Razorpay ke liye options taiyar karein
    const options = {
      amount: Math.round(Number(amount) * 100), // Razorpay paise mein amount leta hai (₹1 = 100 Paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    // 4. Razorpay ka order create karein
    const order = await razorpay.orders.create(options);

    // 5. Frontend ko success response bhejein
    return NextResponse.json({ success: true, data: order });

  } catch (error) {
    // 🔥 YEH LINE AAPKE TERMINAL MEIN ERROR PRINT KAREGI
    console.error("CRITICAL BACKEND ERROR:", error); 

    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
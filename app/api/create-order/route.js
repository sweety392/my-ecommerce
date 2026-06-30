import { NextResponse } from "next/server";
import dbConnect from "@/lib/databaseConnection";
import Order from "@/model/order.model";

export async function POST(request) {
  try {
    console.log("ORDER API HIT");

    await dbConnect();

    const {
      userId,
      products,
      totalAmount,
      phone,
      address,
      paymentMethod,
      paymentStatus,
      orderStatus,
    } = await request.json();

    console.log({
      userId,
      products,
      totalAmount,
      phone,
      address,
      paymentMethod,
    });

    const order = await Order.create({
      userId,
      products,
      totalAmount,
      phone,
      address,
      paymentMethod,
      paymentStatus,
      orderStatus,
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);

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
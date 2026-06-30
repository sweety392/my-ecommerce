import { NextResponse }
from "next/server";

import dbConnect
from "@/lib/databaseConnection";

import Order
from "@/model/order.model";

export async function GET(
  request
) {

  await dbConnect();

  // const search =
  //   request.nextUrl.searchParams.get(
  //     "search"
  //   );

  // let query = {};

  // if (search) {

  //   query = {
  //     "products.title": {
  //       $regex: search,
  //       $options: "i",
  //     },
  //   };

  // }

  const orders = await Order.find({});

console.log(orders);

  return NextResponse.json({
    orders,
  });
}
import dbConnect
from "@/lib/databaseConnection";

import Order
from "@/model/order.model";

export async function POST(
  request
) {

  try {

    await dbConnect();

    const body =
      await request.json();

    const order =
      await Order.create(
        body
      );

    return Response.json({

      success: true,

      order,
    });

  } catch (error) {

    return Response.json({

      success: false,

      message:
        error.message,
    });
  }
}
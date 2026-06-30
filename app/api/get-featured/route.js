import dbConnect from "@/lib/databaseConnection";

import Product from "@/model/product.model";

export async function GET() {

  try {

    await dbConnect();

    const products = await Product.find();

    return Response.json({

      success: true,

      products,
    });

  } catch (error) {

    return Response.json({

      success: false,

      message: error.message,
    });
  }
}
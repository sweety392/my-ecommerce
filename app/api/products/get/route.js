import dbConnect from "@/lib/databaseConnection";

import ProductModel from "@/model/product.model";

export async function GET() {

  try {

    await dbConnect();

    const products =
      await ProductModel.find();

    return Response.json({

      success: true,

      data: products,
    });

  } catch (error) {

    return Response.json({

      success: false,

      message:
        error.message,
    });
  }
}
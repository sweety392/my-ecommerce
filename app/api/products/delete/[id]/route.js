import dbConnect from "@/lib/databaseConnection";

import ProductModel from "@/model/product.model";

export async function DELETE(

  request,

  { params }

) {

  try {

    await dbConnect();

    await ProductModel.findByIdAndDelete(
      params.id
    );

    return Response.json({

      success: true,

      message:
        "Product Deleted",
    });

  } catch (error) {

    return Response.json({

      success: false,

      message:
        error.message,
    });
  }
}
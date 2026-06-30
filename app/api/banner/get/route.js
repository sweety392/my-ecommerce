import dbConnect from "@/lib/databaseConnection";

import BannerModel from "@/model/getBanner.model";

export async function GET() {

  try {

    await dbConnect();

    const banners =
      await BannerModel.find();

    return Response.json({

      success: true,

      data: banners,
    });

  } catch (error) {

    return Response.json({

      success: false,

      message: error.message,
    });
  }
}
import dbConnect from "@/lib/databaseConnection";

import BannerModel from "@/model/banner.model";

export async function POST(request) {

  try {

    await dbConnect();

    const body =
      await request.json();

    const banner =
      await BannerModel.create({

        image: body.image,

        title: body.title,

        description:
          body.description,
      });

    return Response.json({

      success: true,

      data: banner,
    });

  } catch (error) {

    return Response.json({

      success: false,

      message: error.message,
    });
  }
}
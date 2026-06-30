import dbConnect
from "@/lib/databaseConnection";

import ProductModel
from "@/model/product.model";

import cloudinary
from "@/lib/cloudinary";

export async function POST(
  request
) {

  try {

    // ================= DB CONNECT =================

    await dbConnect();

    // ================= FORM DATA =================

    const formData =
      await request.formData();

    const title =
      formData.get("title");

    const price =
      formData.get("price");

    const brand =
      formData.get("brand");

    // ================= GET IMAGES =================

    const files =
      formData.getAll(
        "images"
      );

    // ================= IMAGE ARRAY =================

    let imageArray = [];

    // ================= LOOP =================

    for (const file of files) {

      // FILE BUFFER

      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      // BASE64

      const base64 =
        `data:${file.type};base64,${buffer.toString("base64")}`;

      // CLOUDINARY UPLOAD

      const uploadedImage =
        await cloudinary.uploader.upload(
          base64,
          {
            folder: "products",
          }
        );

      // SAVE URL

      imageArray.push({

        url:
          uploadedImage.secure_url,

      });
    }

    // ================= SAVE PRODUCT =================

    const product =
      await ProductModel.create({

        title,

        price,

        brand,

        images: imageArray,
      });

    return Response.json({

      success: true,

      product,
    });

  } catch (error) {

    console.log(error);

    return Response.json({

      success: false,

      message:
        error.message,
    });
  }
}
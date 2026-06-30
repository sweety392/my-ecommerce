import { NextResponse } from "next/server";
// Aapka Product Model jahan se database connect hoga
import productSchema from "@/model/product.model"; 

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    // MongoDB standard regex code jisse partial search (adha word type karne par bhi) ho sake
    const products = await productSchema.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } }
      ]
    });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
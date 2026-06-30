import {dbConnect} from "@/lib/databaseConnection"
import { NextResponse } from "next/server"
export async function GET(){
  await dbConnect()
  return NextResponse.json({
    success:true,
    message:"connection success"
    

  })
}
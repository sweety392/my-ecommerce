
import React from 'react'
import Image from "next/image"
import banner1 from "@/public/assets/images/banner1.png"

function Banner() {
  return (
    <div className='flex items-center justify-center h-200'>
      <Image src={banner1} width={banner1.width} height={banner1.height}/>
      
    </div>
  )
}

export default Banner
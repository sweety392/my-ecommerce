'use client'
import React from 'react'
import Image from "next/image"
import banner2 from "@/public/assets/images/banner2.png"

function Banner() {
  return (
    <div className='flex items-center justify-center h-200'>
      <Image src={banner2} width={banner2.width} height={banner2.height}/>
      
    </div>
  )
}

export default Banner

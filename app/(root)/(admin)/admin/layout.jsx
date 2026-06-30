"use client"
import Sidebar from "@/components/admin/Sidebar";

import Navbar from "@/components/admin/Navbar";


export default function AdminLayout({

  children,

}) {

  return (

    <div className="flex">

      <Sidebar />

      <div
        className="
          flex-1
          bg-gray-100
          min-h-screen
        "
      >

        <Navbar />

        <div className="p-10">

          {children}
          
        </div>

      </div>

    </div>
  );
}
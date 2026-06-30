"use client"
import Link from "next/link";

export default function Sidebar() {

  return (

    <div className="w-[250px] bg-black text-white min-h-screen p-5">

      <h1 className="text-3xl font-bold mb-10">

        Admin Panel

      </h1>

      <div className="space-y-4">

        <Link href="/admin/dashboard">
          <div>Dashboard</div>
        </Link>

        <Link href="/admin/products">
          <div>Products</div>
        </Link>

        <Link href="/admin/orders">
          <div>Orders</div>
        </Link>

      </div>

    </div>
  );
}
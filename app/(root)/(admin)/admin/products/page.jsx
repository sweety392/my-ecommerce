import Link from "next/link";

import ProductTable from "@/components/admin/ProductTable";

export default function ProductsPage() {

  return (

    <div>

      <div
        className="
          flex
          justify-between
          items-center
          mb-10
        "
      >

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Products
        </h1>

        <Link
          href="/admin/add-prod"
        >

          <button
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Add Product
          </button>

        </Link>

      </div>

      <ProductTable />

    </div>
  );
}
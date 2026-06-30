"use client";

import Image from "next/image";
import Link from "next/link"

import {

  useCart,

} from "@/app/context/CartContext";

export default function CartPage() {

  const {

    cartItems,

    increaseQuantity,

    decreaseQuantity,

    removeItem,

    totalPrice,

  } = useCart();

  return (

    <div
      className="
        max-w-6xl
        mx-auto
        py-10
        px-4
      "
    >

      <h1
        className="
          text-4xl
          font-bold
          mb-10
        "
      >

        Shopping Cart

      </h1>

       {cartItems.length===0 ?(

        <h2
          className="
            text-2xl
            text-gray-500
          "
        >

          Cart is Empty

        </h2>

      ) : (

        <div className="space-y-6">

          {cartItems.map(
            (item) => (

              <div
                key={item._id}

                className="
                  flex
                  items-center
                  gap-5
                  bg-white
                  p-5
                  rounded-2xl
                  shadow-md
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    w-28
                    h-28
                  "
                >

                  <Image
                    src={
                      item.images[0]
                        ?.url
                    }

                    alt={item.title}

                    fill

                    className="
                      object-cover
                      rounded-xl
                    "
                  />

                </div>

                {/* DETAILS */}

                <div className="flex-1">

                  <h2
                    className="
                      text-xl
                      font-bold
                    "
                  >

                    {item.title}

                  </h2>

                  <p
                    className="
                      text-gray-500
                    "
                  >

                    {item.brand}

                  </p>

                  <p
                    className="
                      text-2xl
                      font-bold
                      text-[#3bb77e]
                      mt-2
                    "
                  >

                    ₹{item.price}

                  </p>

                </div>

                {/* QUANTITY */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <button
                   onClick = {()=>decreaseQuantity(item._id)}

                    className="
                      w-10
                      h-10
                      bg-gray-200
                      rounded-full
                    "
                  >

                    -

                  </button>

                  <span
                    className="
                      text-xl
                      font-bold
                    "
                  >

                    {item.quantity}

                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item._id
                      )
                    }

                    className="
                      w-10
                      h-10
                      bg-gray-200
                      rounded-full
                    "
                  >

                    +

                  </button>

                </div>

                {/* REMOVE */}

                <button
                 onClick={()=>removeItem(item._id)}

                  className="
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-xl
                  "
                >

                  Remove

                </button>

              </div>
            )
          )}

          {/* TOTAL */}

          <div
            className="
              flex
              justify-between
              items-center
              mt-10
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >

            <h2
              className="
                text-3xl
                font-bold
              "
            >

              Total:
              ₹{totalPrice}

            </h2>
<Link href="/checkout">
            <button
              className="
                bg-[#3bb77e]
                hover:bg-[#2ea76d]
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
              "
            >

              Checkout

            </button>
            </Link>

          </div>

        </div>
      )}

    </div>
  );
}
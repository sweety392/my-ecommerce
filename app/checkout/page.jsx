"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Script from "next/script";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();

  const { cartItems = [] } = useCart();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const totalPrice =
    cartItems?.reduce(
      (total, item) =>
        total +
        (item.price || 0) *
          (item.quantity || 1),
      0
    ) || 0;

  const getOrderId = async (amount) => {
    try {
      const { data } = await axios.post(
        "/api/payment/get-order",
        { amount }
      );

      return data;
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: "Unable to create Razorpay order",
      };
    }
  };

  const createOrder = async () => {
    const response = await fetch(
      "/api/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          products: cartItems,
          totalAmount: totalPrice,
          phone,
          address,
          paymentMethod,
          paymentStatus:
            paymentMethod === "COD"
              ? "Pending"
              : "Paid",
          orderStatus: "Placed",
        }),
      }
    );

    return await response.json();
  };

  const handleCheckout = async () => {
    if (!phone || !address) {
      alert(
        "Please fill all delivery details"
      );
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      // COD
      if (paymentMethod === "COD") {
        const data =
          await createOrder();

        console.log(data);

        if (!data.success) {
          alert(
            data.message ||
              "Order creation failed"
          );
          return;
        }

        alert(
          "Order placed successfully!"
        );

        router.push(
          "/order-success"
        );

        return;
      }

      // Razorpay
      const orderResponse =
        await getOrderId(
          totalPrice
        );

      if (
        !orderResponse?.success
      ) {
        alert(
          orderResponse?.message ||
            "Payment initialization failed"
        );
        return;
      }

      const order =
        orderResponse.data;

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount:
          order.amount,

        currency:
          order.currency,

        order_id:
          order.id,

        name:
          "My E-Commerce Store",

        description:
          "Order Payment",

        prefill: {
          contact: phone,
        },

        theme: {
          color: "#3bb77e",
        },

        handler:
          async function (
            response
          ) {
            console.log(
              response
            );

            const saveOrder =
              await createOrder();

            console.log(
              saveOrder
            );

            if (
              !saveOrder.success
            ) {
              alert(
                "Payment successful but order saving failed"
              );
              return;
            }

            alert(
              "Payment Successful"
            );

            router.push(
              "/order-success"
            );
          },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Delivery Details
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-xl"
            />

            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              rows={4}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Payment Method
          </h2>

          <div className="space-y-3">
            <label className="flex gap-2">
              <input
                type="radio"
                value="COD"
                checked={
                  paymentMethod ===
                  "COD"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />
              Cash On Delivery
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                value="RAZORPAY"
                checked={
                  paymentMethod ===
                  "RAZORPAY"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />
              Pay Online
            </label>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {cartItems?.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 mb-4"
            >
              <div className="relative w-20 h-20">
                <Image
                  src={
                    item.images?.[0]
                      ?.url ||
                    "/placeholder.png"
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold">
                  {item.title}
                </h3>

                <p>
                  Qty:{" "}
                  {item.quantity}
                </p>

                <p>
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}

          <div className="border-t mt-4 pt-4">
            <h2 className="text-3xl font-bold">
              Total : ₹
              {totalPrice}
            </h2>
          </div>

          <button
            onClick={
              handleCheckout
            }
            disabled={loading}
            className="w-full mt-6 bg-[#3bb77e] text-white py-4 rounded-xl"
          >
            {loading
              ? "Processing..."
              : "Place Order"}
          </button>
        </div>
      </div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}
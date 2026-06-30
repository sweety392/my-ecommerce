// app/auth/verify-email/[token]/page.jsx

"use client";

import axios from "axios";
import Link from "next/link";

import { use, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import {
  CheckCircle,
  XCircle,
  ShoppingBag,
  Loader2,
} from "lucide-react";

function Page({ params }) {

  // ================= GET TOKEN =================

  const { token } = use(params);

  console.log(token);

  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  // ================= VERIFY EMAIL =================

  const verifyEmail = async () => {

    try {

      const response = await axios.post(
        "/api/auth/verify-email",
        {
          token,
        }
      );

      setSuccess(true);

      setMessage(response.data.message);

    } catch (error) {

      setSuccess(false);

      setMessage(
        error.response?.data?.message ||
        "Verification failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // ================= PAGE LOAD =================

  useEffect(() => {

    if (token) {

      verifyEmail();
    }

  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">

      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0">

        <CardContent className="p-10 text-center">

          {
            loading ? (

              <div className="flex flex-col items-center gap-4">

                <Loader2
                  className="animate-spin text-blue-600"
                  size={60}
                />

                <h1 className="text-3xl font-bold">
                  Verifying Email...
                </h1>

              </div>

            ) : (

              <>
                {
                  success ? (

                    <div className="flex flex-col items-center">

                      <CheckCircle
                        size={90}
                        className="text-green-500 mb-5"
                      />

                      <h1 className="text-4xl font-bold text-green-600 mb-3">

                        Verification Successful

                      </h1>

                      <p className="text-gray-600 mb-8">

                        {message}

                      </p>

                    </div>

                  ) : (

                    <div className="flex flex-col items-center">

                      <XCircle
                        size={90}
                        className="text-red-500 mb-5"
                      />

                      <h1 className="text-4xl font-bold text-red-500 mb-3">

                        Verification Failed

                      </h1>

                      <p className="text-gray-600 mb-8">

                        {message}

                      </p>

                    </div>
                  )
                }

                <Link href="/">

                  <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-semibold">

                    <ShoppingBag size={24} />

                    Continue Shopping

                  </button>

                </Link>
              </>
            )
          }

        </CardContent>

      </Card>

    </div>
  );
}

export default Page;
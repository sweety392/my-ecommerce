import "./globals.css";

import { Kumbh_Sans }
from "next/font/google";

import NavbarWebsite
from "@/components/website/NavbarWebsite";

import Footer
from "@/components/website/Footer";

import Providers
from "./providers";

import {

  CartProvider,

} from "./context/CartContext";

const kumbh = Kumbh_Sans({

  subsets: ["latin"],

  weight: [

    "400",

    "500",

    "600",

    "700",

  ],
});

export const metadata = {

  title: "eStore",

  description:
    "Modern Ecommerce Website",
};

export default function RootLayout({

  children,

}) {

  return (

    <html lang="en">

      <body
        className={
          kumbh.className
        }
      >

        <Providers>

          <CartProvider>

            <NavbarWebsite />

            {children}

            <Footer />

          </CartProvider>

        </Providers>

      </body>

    </html>
  );
}
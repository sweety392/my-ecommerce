"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

/* ================= CREATE CONTEXT ================= */

const CartContext = createContext();

/* ================= PROVIDER ================= */

export function CartProvider({
  children,
}) {
  /* ================= CART STATE ================= */

  const [cartItems, setCartItems] =
    useState([]);

  /* ================= ADD TO CART ================= */

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingProduct =
        prev.find(
          (item) =>
            item._id ===
            product._id
        );

      if (existingProduct) {
        return prev.map(
          (item) =>
            item._id ===
            product._id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  /* ================= INCREASE QUANTITY ================= */

  const increaseQuantity = (
    id
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  /* ================= DECREASE QUANTITY ================= */

  const decreaseQuantity = (
    id
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  /* ================= REMOVE ITEM ================= */

  const removeItem = (
    id
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          item._id !== id
      )
    );
  };

  /* ================= TOTAL ITEMS ================= */

  const totalItems =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.quantity,
      0
    );

  /* ================= TOTAL PRICE ================= */

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  /* ================= RETURN ================= */

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ================= CUSTOM HOOK ================= */

export const useCart = () =>
  useContext(
    CartContext
  );
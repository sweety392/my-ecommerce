"use client";

import {
  useEffect,
  useState,
} from "react";

import SearchInput
  from "@/components/admin/searchInput";

import OrderTable
  from "@/components/admin/OrdersTable";

import useOrders
  from "@/app/hooks/useOrder";

export default function OrdersPage() {
  const [search,
    setSearch] =
    useState("");

  const {
    orders,
    fetchOrders,
  } = useOrders();

  useEffect(() => {
    fetchOrders(search);
  }, [search]);

  return (
    <div className="p-5">
      <SearchInput
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div className="mt-5">
        <OrderTable
          orders={orders}
        />
      </div>
    </div>
  );
}
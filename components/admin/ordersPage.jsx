"use client";

import { useEffect, useState } from "react";

import SearchInput from "@/components/SearchInput";
import OrderTable from "@/components/OrderTable";
import useOrders from "@/hooks/useOrders";

export default function OrdersPage() {

  const [search, setSearch] =
    useState("");

  const {
    orders,
    fetchOrders,
  } = useOrders();

  useEffect(() => {
     console.log("Searching:", search);

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

      <OrderTable
        orders={orders}
      />

    </div>
  );
}
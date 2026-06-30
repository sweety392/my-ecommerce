import { useState } from "react";
import { searchOrders }
from "@/app/services/ordersService";

export default function useOrders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const fetchOrders = async (
    searchTerm = ""
  ) => {

    try {

      setLoading(true);

      const data =
        await searchOrders(
          searchTerm
        );

      console.log(data);

      setOrders(
        data.orders || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return {
    orders,
    loading,
    fetchOrders,
  };
}
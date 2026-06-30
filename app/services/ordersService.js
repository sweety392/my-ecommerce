import axios from "axios";

export const searchOrders = async (
  searchTerm
) => {

  const response =
    await axios.get(
      `/api/admin/orders/search?search=${searchTerm}`
    );

  return response.data;
};
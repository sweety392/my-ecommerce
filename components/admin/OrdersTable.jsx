export default function OrderTable({
  orders = [],
}) {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-3">
            Order ID
          </th>

          <th className="border p-3">
            Status
          </th>

          <th className="border p-3">
            Payment
          </th>

          <th className="border p-3">
            Total
          </th>
        </tr>
      </thead>

      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-3">
                {order._id}
              </td>

              <td className="border p-3">
                {order.orderStatus}
              </td>

              <td className="border p-3">
                {order.paymentStatus}
              </td>

              <td className="border p-3">
                ₹{order.totalAmount}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="text-center p-4"
            >
              No Orders Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
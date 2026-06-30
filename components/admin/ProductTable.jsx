export default function ProductTable({
  products,
}) {
  return (
    <table className="w-full border">

      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>

        {products?.map(
          (product) => (

          <tr key={product._id}>

            <td>
              {product._id}
            </td>

            <td>
              {product.title}
            </td>

            <td>
              ₹{product.price}
            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}
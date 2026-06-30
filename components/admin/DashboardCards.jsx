export default function DashboardCards() {

  return (

    <div className="grid grid-cols-4 gap-5">

      <div className="bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-gray-500">
          Products
        </h2>

        <h1 className="text-4xl font-bold mt-4">
          250
        </h1>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-gray-500">
          Orders
        </h2>

        <h1 className="text-4xl font-bold mt-4">
          1500
        </h1>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-gray-500">
          Customers
        </h2>

        <h1 className="text-4xl font-bold mt-4">
          900
        </h1>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-gray-500">
          Revenue
        </h2>

        <h1 className="text-4xl font-bold mt-4">
          $12K
        </h1>

      </div>

    </div>
  );
}
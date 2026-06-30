
export default function Navbar() {

  return (

    <div
      className="
        h-[80px]
        bg-white
        shadow-md
        flex
        items-center
        justify-between
        px-10
      "
    >

      <input
        type="text"
        placeholder="Search Component"
        className="
          w-[400px]
          h-12
          border
          rounded-xl
          px-4
          outline-none
        "
      />

      <div className="flex items-center gap-5">

        <div className="text-3xl">
          🛒
        </div>

        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
            "
          >
            A
          </div>

          <h2 className="font-bold">
            Admin
          </h2>

        </div>

      </div>

    </div>
  );
}
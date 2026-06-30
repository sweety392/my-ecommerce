export default function SearchInput({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Search Orders..."
      value={value}
       onChange={(e) => {
        console.log("Input Changed:", e.target.value);
        onChange(e);}}
      className="
      border
      p-2
      rounded
      w-full
      "
    />
  );
}
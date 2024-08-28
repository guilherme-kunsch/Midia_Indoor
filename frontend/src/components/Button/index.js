export default function Button({ color, text }) {
  return (
    <button className={`text-black font-bold p-4 px-10 rounded-lg ${color} cursor-pointer`}>
      {text}
    </button>
  );
}

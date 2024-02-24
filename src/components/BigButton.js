export default function BigButton({ text, onClick }) {
  return <button className="shadow-md bg-pingpongred hover:bg-scarlet font-kanit rounded-full text-4xl h-16 w-40 text-white border-white border-opacity-95" onClick={onClick}>{text}</button>
}

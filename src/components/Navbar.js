function Navbar({ choices, fn }) {
  // strings is an array of strings
  // when the user selects one of the navigation elements, fn is called with the index of the selected element

  return <div className="min-w-full h-8 flex flex-row">
    {choices.map((s, i) => <div className="font-kanit flex-1 text-center text-lg border hover:bg-gray-50 hover:cursor-pointer" key={i} onClick={() => fn(i)}>{s}</div>)}
  </div>
}

export default Navbar

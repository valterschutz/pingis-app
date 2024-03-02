import AnimatedButton from "./AnimatedButton"

function Navbar({ choices, fn }) {
  // strings is an array of strings
  // when the user selects one of the navigation elements, fn is called with the index of the selected element

  return <div className="min-w-full h-10 flex flex-row">
    {choices.map((s, i) => <AnimatedButton classes="m-1 bg-pingpongred hover:bg-scarlet text-white font-kanit flex-1 text-center text-lg hover:brighness-20 hover:cursor-pointer flex justify-center items-center rounded-sm" key={i} onClick={() => fn(i)}>{s}</AnimatedButton>)}
  </div>
}

export default Navbar

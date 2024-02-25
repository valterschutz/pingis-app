import AnimatedButton from "./AnimatedButton"

export default function ScoreIncrementer({ score, setScore }) {
  return <div className="flex flex-row justify-center items-center gap-2">
    <AnimatedButton classes="shadow-md text-4xl font-bold h-20 w-20 bg-pingpongred text-white border-opacity-95 border-white rounded-full pb-1.5 hover:bg-scarlet" onClick={() => { setScore(score - 1) }}>-</AnimatedButton>
    <input className="shadow-md text-4xl h-12 w-40 rounded-lg text-center font-kanit" type="number" value={score} onChange={e => {
      setScore(parseInt(e.target.value))
    }} />
    <AnimatedButton classes="shadow-md text-4xl font-bold h-20 w-20 bg-pingpongred text-white border-opacity-95 border-white rounded-full pb-1.5 hover:bg-scarlet" onClick={() => { setScore(score + 1) }}>+</AnimatedButton>
  </div>
}

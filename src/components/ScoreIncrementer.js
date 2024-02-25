import AnimatedButton from "./AnimatedButton"

export default function ScoreIncrementer({ score, setScore }) {
  return <div className="flex flex-row justify-center items-center gap-2">
    <AnimatedButton text="-" onClick={() => { setScore(score - 1) }} />
    <input className="shadow-md text-4xl h-12 w-40 rounded-lg text-center font-kanit" type="number" value={score} onChange={e => {
      setScore(parseInt(e.target.value))
    }} />
    <AnimatedButton text="+" onClick={() => { setScore(score + 1) }} />
  </div>
}

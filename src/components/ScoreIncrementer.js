export default function ScoreIncrementer({ score, setScore }) {
  return <div className="flex flex-row justify-center items-center gap-2">
    <button className="shadow-md text-4xl font-bold h-20 w-20 bg-pingpongred text-white border-opacity-95 border-white rounded-full" onClick={() => { setScore(score - 1) }}>-</button>
    <input className="shadow-md text-4xl h-12 w-40 rounded-lg text-center font-kanit" type="number" value={score} onChange={e => {
      setPlayer1Score(parseInt(e.target.value))
    }} />
    <button className="shadow-md text-4xl font-bold h-20 w-20 bg-pingpongred text-white border-opacity-95 border-white rounded-full" onClick={() => { setScore(score + 1) }}>+</button>
  </div>
}

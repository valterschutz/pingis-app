import React, { useState } from 'react'

export default function BigButton({ text, onClick }) {
  const [animated, setAnimated] = useState(false)
  const animationDuration = 1000

  const animateFn = () => {
    setAnimated(true)
    setTimeout(() => {
      setAnimated(false)
    }, animationDuration)
  }
  return <button className="shadow-md bg-pingpongred hover:bg-scarlet font-kanit rounded-full text-4xl h-16 w-40 text-white border-white border-opacity-95"
    style={animated ? { animation: 'jello linear', animationDuration: `${animationDuration}ms` } : {}}
    onClick={() => { animateFn(); onClick() }}>
    {text}
  </ button>
}

import React, { useState } from 'react'

export default function AnimatedButton({ text, onClick }) {
  const [animated, setAnimated] = useState(false)
  const animationDuration = 100

  const animateFn = () => {
    setAnimated(true)
    setTimeout(() => {
      setAnimated(false)
    }, 100)
  }

  return <button
    className={`shadow-md text-4xl font-bold h-20 w-20 bg-pingpongred text-white border-opacity-95 border-white rounded-full pb-1.5 hover:bg-scarlet`}
    style={animated ? { animation: 'pulse linear', animationDuration: `${animationDuration}ms` } : {}}
    onClick={() => { animateFn(); onClick() }}>
    <span>
      {text}
    </span>
  </button>
}

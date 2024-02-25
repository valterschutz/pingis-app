import React, { useState } from 'react'

export default function AnimatedButton({ children, classes, onClick }) {
  const [animated, setAnimated] = useState(false)
  const animationDuration = 100

  const animateFn = () => {
    setAnimated(true)
    setTimeout(() => {
      setAnimated(false)
    }, 100)
  }

  return <button
    className={classes}
    style={animated ? { animation: 'pulse linear', animationDuration: `${animationDuration}ms` } : {}}
    onClick={() => { animateFn(); onClick() }}>
    <span>
      {children}
    </span>
  </button>
}

import React, { useState } from 'react'

export default function BigButton({ text, onClick, isLoading, classes }) {
  return <button className={`shadow-md bg-pingpongred hover:bg-scarlet active:bg-scarlet font-kanit rounded-full text-4xl h-16 w-40 text-white border-white border-opacity-95 flex justify-center items-center ${classes}`}
    onClick={() => { onClick() }}>
    {isLoading ? <div className="lds-dual-ring"></div> : text}
  </ button>
}

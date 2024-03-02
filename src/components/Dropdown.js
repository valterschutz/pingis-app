import { useState, useRef, useEffect } from "react"
import AnimatedButton from "./AnimatedButton"

export default function Dropdown({ items, index, setIndex, fireIndex }) {
  const [isActive, setIsActive] = useState(false)

  // Filter out 🔥 from items
  const filtItems = items.map(item => item.replaceAll(/🔥/g, ''))

  const selectedItem = filtItems[index]
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return <div ref={dropdownRef}>
    <div>
      <AnimatedButton classes={`${isActive ? 'invisible' : 'visible'} text-center h-10 rounded-lg min-w-80 px-2 text-2xl text-white ${index === fireIndex ? 'fire-gradient' : 'bg-darkbrown text-black'} shadow-md`} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setIsActive(!isActive)}>
        {index === fireIndex ? `🔥 ${selectedItem} 🔥` : selectedItem}
      </AnimatedButton>
    </div>
    {
      isActive && <div id="dropdown-menu" role="menu">
        <div className="flex flex-col gap-1">
          {filtItems.map((item, i) => <AnimatedButton key={i} classes={`${isActive ? 'visible' : 'invisible'} brightness-75 text-center h-10 rounded-lg min-w-80 px-2 text-2xl text-white ${index === fireIndex ? 'fire-gradient' : 'bg-darkbrown text-black'} shadow-md`} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => { setIndex(i); setIsActive(!isActive) }}>
            {i === fireIndex ? `🔥 ${item} 🔥` : item}
          </AnimatedButton>)}
        </div>
      </div>
    }
  </div >
}

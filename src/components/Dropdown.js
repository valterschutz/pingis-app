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

  return <div ref={dropdownRef} className="max-h-36 overflow-y-auto rounded-lg">
    {!isActive ?

      <AnimatedButton classes={`${isActive ? 'invisible' : 'visible'} text-center h-12 rounded-lg min-w-80 px-2 text-2xl text-white ${index === fireIndex ? 'fire-gradient' : 'bg-scarlet text-white'} shadow-md`} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setIsActive(!isActive)}>
        {index === fireIndex ? `🔥 ${selectedItem} 🔥` : selectedItem}
      </AnimatedButton>
      :

      <div id="dropdown-menu" role="menu">
        <div className="flex flex-col rounded-lg divide-y-2 divide-apricot/100">
          {filtItems.map((item, i) => <AnimatedButton key={i} classes={`${isActive ? 'visible' : 'invisible'} first:rounded-t-lg last:rounded-b-lg brightness-75 hover:brightness-100 text-center h-12 min-w-80 px-2 text-2xl text-white ${i === fireIndex ? 'fire-gradient' : 'bg-scarlet text-white'} shadow-md`} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => { setIndex(i); setIsActive(!isActive) }}>
            {i === fireIndex ? `🔥 ${item} 🔥` : item}
          </AnimatedButton>)}
        </div>
      </div>
    }
  </div >
}

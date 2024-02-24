import { useState, useRef, useEffect } from "react"

export default function Dropdown({ items, index, setIndex, fireIndex }) {
  const [isActive, setIsActive] = useState(false)
  const selectedItem = items[index]
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
      <button className={`${isActive ? 'invisible' : 'visible'} text-center h-10 rounded-lg w-40 text-white text-2xl bg-darkbrown shadow-md`} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setIsActive(!isActive)}>
        {index === fireIndex ? `🔥 ${selectedItem} 🔥` : selectedItem}
      </button>
    </div>
    {
      isActive && <div id="dropdown-menu" role="menu">
        <div className="divide-y flex flex-col gap-1">
          {items.map((item, i) => <div className="hover:cursor-pointer brightness-75 flex flex-col justify-center text-center h-10 rounded-lg w-40 text-white text-2xl bg-darkbrown" key={i} onClick={() => {
            setIndex(i)
            setIsActive(false)
          }}>
            {i === fireIndex ? `🔥 ${item} 🔥 ` : item}
          </div>)}
        </div>
      </div>
    }
  </div >
}

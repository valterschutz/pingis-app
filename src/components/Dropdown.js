import { useState, useRef, useEffect } from "react"

export default function Dropdown({ items, index, setIndex }) {
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

  return <div ref={dropdownRef} className={`dropdown ${isActive && 'is-active'}`}>
    <div className="dropdown-trigger">
      <button className="button is-large" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setIsActive(!isActive)}>
        <span>{selectedItem}</span>
        <span className="icon is-small">
          <i className="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    {isActive && <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {items.map((item, i) => <div key={i} className={`dropdown-item is-clickable is-size-4 ${i === index && 'is-active'}`} onClick={() => {
          setIndex(i)
          setIsActive(false)
        }}>
          {item}
        </div>)}
      </div>
    </div>}
  </div>
}

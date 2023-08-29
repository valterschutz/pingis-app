import { useState } from "react"

export default function Dropdown({items}) {
  const [isActive, setIsActive] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedItem = items[selectedIndex]
  return <div class={`dropdown ${isActive && 'is-active'}`}>
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setIsActive(!isActive)}>
        <span>{selectedItem}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    {isActive && <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        {items.map((item,i) => <a class={`dropdown-item ${i === selectedIndex && 'is-active'}`} onClick={() => {
          setSelectedIndex(i)
          setIsActive(false)
        }}>
                          {item}
                         </a>)}
      </div>
    </div>}
  </div>
}

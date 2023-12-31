import { useState } from "react"

export default function Dropdown({items, index, setIndex}) {
  const [isActive, setIsActive] = useState(false)
  const selectedItem = items[index]
  return <div class={`dropdown ${isActive && 'is-active'}`}>
    <div class="dropdown-trigger">
      <button class="button is-large" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setIsActive(!isActive)}>
        <span>{selectedItem}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    {isActive && <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        {items.map((item,i) => <div class={`dropdown-item is-clickable is-size-4 ${i === index && 'is-active'}`} onClick={() => {
          setIndex(i)
          setIsActive(false)
        }}>
                          {item}
                         </div>)}
      </div>
    </div>}
  </div>
}

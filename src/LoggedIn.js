import React, { useState } from 'react'
import Entries from './Entries'
import Stats from './Stats'
import Settings from './Settings'

function LoggedIn() {
  const [tabIndex, setTabIndex] = useState(0)

  return <div>
    <div>
      <div>
        <ul>
          <li><a onClick={() => setTabIndex(0)}>Entries</a></li>
          <li><a onClick={() => setTabIndex(1)}>Stats</a></li>
          <li><a onClick={() => setTabIndex(2)}>Settings</a></li>
        </ul>
      </div>
    </div>
    {tabIndex === 0 && <Entries />}
    {tabIndex === 1 && <Stats />}
    {tabIndex === 2 && <Settings />}
  </div >
}

export default LoggedIn

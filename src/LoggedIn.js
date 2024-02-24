import React, { useState } from 'react'
import Entries from './Entries'
import Stats from './Stats'
import Settings from './Settings'

function LoggedIn() {
  const [tabIndex, setTabIndex] = useState(0)

  return <div className="App is-flex is-flex-direction-column is-justify-content-space-between">
    <div className="section px-0 py-0">
      <div className="tabs is-centered is-fullwidth">
        <ul>
          <li className={tabIndex === 0 ? "is-active" : ""}><a onClick={() => setTabIndex(0)}>Entries</a></li>
          <li className={tabIndex === 1 ? "is-active" : ""}><a onClick={() => setTabIndex(1)}>Stats</a></li>
          <li className={tabIndex === 2 ? "is-active" : ""}><a onClick={() => setTabIndex(2)}>Settings</a></li>
        </ul>
      </div>
    </div>
    {tabIndex === 0 && <Entries />}
    {tabIndex === 1 && <Stats />}
    {tabIndex === 2 && <Settings />}
  </div >
}

export default LoggedIn

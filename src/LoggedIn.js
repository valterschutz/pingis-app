import React, { useState } from 'react'
import Entries from './Entries'
import Stats from './Stats'
import Settings from './Settings'
import Navbar from './components/Navbar'

function LoggedIn() {
  const [tabIndex, setTabIndex] = useState(0)

  return <>
    <Navbar choices={['Entries', 'Stats', 'Settings']} fn={setTabIndex} />
    {tabIndex === 0 && <Entries />}
    {tabIndex === 1 && <Stats />}
    {tabIndex === 2 && <Settings />}
  </>
}

export default LoggedIn

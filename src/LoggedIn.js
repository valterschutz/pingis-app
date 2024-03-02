import React, { useState } from 'react'
import Entry from './Entry'
import Stats from './Stats'
import MatchesView from './MatchesView'
import Settings from './Settings'
import Navbar from './components/Navbar'
import { MatchesContext, PlayersContext, SettingsContext, FirebaseContext } from './contexts'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import { useContext } from 'react'

function LoggedIn() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [playersData, playersLoading, playersError, playersSnapshot] = useCollectionData(collection(db, 'players'))
  const [matchesData, matchesLoading, matchesError, matchesSnapshot] = useCollectionData(collection(db, 'matches'))

  // Settings that affect app behaviour. Probably modified in the Settings view
  const [settings, setSettings] = useState({
    undoEnabled: true,
    undoTimeout: 10,
  })

  const [tabIndex, setTabIndex] = useState(0)

  return <PlayersContext.Provider value={[playersData, playersLoading, playersError, playersSnapshot]}>
    <MatchesContext.Provider value={[matchesData, matchesLoading, matchesError, matchesSnapshot]}>
      <SettingsContext.Provider value={[settings, setSettings]}>
        <Navbar choices={['Entry', 'Matches', 'Stats', 'Settings']} fn={setTabIndex} />
        {tabIndex === 0 && <Entry />}
        {tabIndex === 1 && <MatchesView />}
        {tabIndex === 2 && <Stats />}
        {tabIndex === 3 && <Settings />}
      </SettingsContext.Provider>
    </MatchesContext.Provider>
  </PlayersContext.Provider>
}

export default LoggedIn

import React, { useContext, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { FirebaseContext, SettingsContext } from './contexts';
import BigButton from './components/BigButton';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import InfoBox from './components/InfoBox';
import { collection, updateDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import ToggleSwitch from './components/ToggleSwitch';

function Settings() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [settings, setSettings] = useContext(SettingsContext)
  const [user, userLoading, userError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const [updateProfile, updateProfileUpdating, updateProfileError] = useUpdateProfile(auth);
  const [infoBoxMessage, setInfoBoxMessage] = useState('')
  const [infoBoxType, setInfoBoxType] = useState('')

  const [inputDisplayName, setInputDisplayName] = useState(user?.displayName || '')
  const [undoTimeoutText, setUndoTimeoutText] = useState(String(settings.undoTimeout) || '10')

  const saveDisplayName = async () => {
    try {
      // Update auth user profile
      updateProfile({ displayName: inputDisplayName })
      // Also update the player document in the database
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        if ('player' in userData) {
          const playerDoc = await getDoc(doc(db, 'players', userData.player))
          if (playerDoc.exists()) {
            await updateDoc(doc(db, 'players', userData.player), { displayName: inputDisplayName })
            console.log(`Display name updated to "${inputDisplayName}"`);
            setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: Display name updated to "${inputDisplayName}"`)
            setInfoBoxType('success')
          } else {
            console.error(`Player document ${userData.player} does not exist`);
            setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: Player document ${userData.player} does not exist`)
            setInfoBoxType('error')
          }
        } else {
          console.error('User document does not contain a player reference');
          setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: User document does not contain a player reference`)
          setInfoBoxType('error')
        }
      } else {
        console.log('No user document found for this user');
        setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: No user document found for this user`)
        setInfoBoxType('error')
      }
    } catch (error) {
      console.error('Error updating display name:', error);
      setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: Error updating display name: ${error}`)
      setInfoBoxType('error')
    }
  }

  const saveUndoTimeout = () => {
    setSettings(prevSettings => { return { ...prevSettings, undoTimeout: parseInt(undoTimeoutText) } })
    console.log(`Undo timeout updated to ${undoTimeoutText} seconds`);
    setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: Undo timeout updated to ${undoTimeoutText} seconds`)
    setInfoBoxType('success')
  }

  return <div className="flex flex-col flex-grow justify-center items-center gap-24">
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="font-kanit text-4xl text-darkbrown font-bold tracking-wider underline">Profile info</h2>
      <div className="flex flex-col items-center">
        <h3 className="font-kanit text-2xl text-darkbrown mb-1 ml-1">Display name</h3>
        <div className="flex items-center justify-center gap-2">
          <input placeholder="Display name" className="px-2 shadow-md bg-white rounded-lg h-10 text-lg w-60" type="text" value={inputDisplayName} onChange={e => setInputDisplayName(e.target.value)} />
          <button className="bg-pingpongred hover:bg-scarlet text-white font-kanit text-xl font-bold w-16 h-10 rounded-lg" onClick={saveDisplayName}>Save</button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-kanit text-2xl text-darkbrown mb-1 ml-1">Undo functionality</h3>
        <div className="flex items-center justify-center gap-2">
          <h4>Enabled?</h4>
          <ToggleSwitch toggleState={settings.undoEnabled} onToggle={bool => {
            setSettings(prevSettings => { return { ...prevSettings, undoEnabled: bool } })
          }} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <h4>Timeout (s)</h4>
          <input placeholder="10" className="px-2 shadow-md bg-white rounded-lg h-10 text-lg w-20" type="text" value={undoTimeoutText} onChange={e => setUndoTimeoutText(e.target.value)} />
          <button className="bg-pingpongred hover:bg-scarlet text-white font-kanit text-xl font-bold w-16 h-10 rounded-lg" onClick={saveUndoTimeout}>Save</button>
        </div>
      </div>
    </div>
    <BigButton text="Log out" onClick={() => signOut()} />
    <InfoBox message={infoBoxMessage} type={infoBoxType} />
  </div>
}

export default Settings

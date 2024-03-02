import React, { useContext, useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './contexts';
import InfoBox from './components/InfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faSignature } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo.png';
import BigButton from './components/BigButton';
import { addDoc, doc, setDoc, collection, getDoc } from 'firebase/firestore';

export default function SignupForm() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [infoBoxMessage, setInfoBoxMessage] = useState('')
  const [infoBoxType, setInfoBoxType] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const onUserSignupFn = async () => {
    // No error handling here since it will not be shown anyway as the user will be redirected to the login page
    try {
      // Create an Auth user
      const userCred = await createUserWithEmailAndPassword(email, password)

      // Create a player document in Firestore
      const playerData = {
        firstName: firstName,
        lastName: lastName,
      }
      // If there is not already a player document with `firstName` as ID, create it
      const prevPlayerDoc = await getDoc(doc(db, "players", firstName))
      let playerDoc
      if (prevPlayerDoc.exists()) {
        // Randomly generate a new ID
        playerDoc = await addDoc(collection(db, "players"), playerData);
      } else {
        // Use first name (lowercased) as ID
        playerDoc = doc(db, "players", firstName.toLowerCase())
        await setDoc(playerDoc, playerData)
      }

      // Also create a user document in Firestore with a reference to the player document
      // By default, the user is not allowed to add or delete matches
      const userData = {
        player: playerDoc.id,
        allowAddMatch: false,
        allowDeleteMatch: false
      }
      await setDoc(doc(db, "users", userCred.user.uid), userData)
    } catch (error) {
      console.error('Error signing up:', error);
      setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: ${error.message}`)
      setInfoBoxType('error')
    }
  }

  useEffect(() => {
    if (error) {
      setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: ${error.message}`)
      setInfoBoxType('error')
    }
  }, [error])

  return <div className="flex-grow flex flex-col justify-center items-center">
    <div className="flex flex-col justify-center items-center">
      <img className="max-h-60" src={logo} alt="logo" />
      <div className="flex flex-col justify-center items-center">
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faSignature} />
          </span>
          <input placeholder="Firstname" className="pl-8 pr-2 shadow-md bg-white rounded-lg h-10 text-xl  ml-2" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faSignature} />
          </span>
          <input placeholder="Lastname" className="pl-8 pr-2 shadow-md bg-white rounded-lg h-10 text-xl  ml-2" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input placeholder="pingisapp@gmail.com" className="pl-8 pr-2 shadow-md bg-white rounded-lg h-10 text-xl  ml-2" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="relative mb-8">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input placeholder="******" className="pl-8 pr-2 shadow-md bg-white rounded-lg h-10 text-xl ml-2" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <BigButton text="Sign up" onClick={onUserSignupFn} />
      </div>
    </div>

    <InfoBox message={infoBoxMessage} type={infoBoxType} />
  </div >
}

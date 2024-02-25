import React, { useContext, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './contexts';
import Form from './Form';
import InfoBox from './components/InfoBox';

export default function LoginForm() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [infoBoxMessage, setInfoBoxMessage] = useState('')
  const [infoBoxType, setInfoBoxType] = useState('')

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (error) {
      setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: ${error.message}`)
      setInfoBoxType('error')
    }
  }, [error])

  return <div className="flex-grow flex flex-col justify-center items-center">
    <Form buttonText="Log in" buttonFn={signInWithEmailAndPassword} />
    <InfoBox message={infoBoxMessage} type={infoBoxType} />
  </div >
}

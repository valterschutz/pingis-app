import React, { useContext, useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './contexts';
import Form from './Form';
import InfoBox from './components/InfoBox';

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

  useEffect(() => {
    if (error) {
      setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: ${error.message}`)
      setInfoBoxType('error')
    }
  }, [error])

  return <div className="flex-grow flex flex-col justify-center items-center">
    <Form buttonText="Sign up" buttonFn={createUserWithEmailAndPassword} />
    <InfoBox message={infoBoxMessage} type={infoBoxType} />
  </div >
}

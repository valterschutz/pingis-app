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
  const errorMessage = error?.message
  const [visibleError, setVisibleError] = useState(false)

  useEffect(() => {
    if (error) {
      setVisibleError(true)
      const timeout = setTimeout(() => {
        setVisibleError(false)
      }, 2000)
    }
  }, [error])

  return <div className="flex-grow flex flex-col justify-between items-center">
    <Form buttonText="Sign up" buttonFn={createUserWithEmailAndPassword} />
    <InfoBox text={errorMessage} isVisible={visibleError} />
  </div >
}

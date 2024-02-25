import React, { useContext, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './contexts';
import Form from './Form';
import InfoBox from './components/InfoBox';

export default function LoginForm() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
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
    <Form buttonText="Log in" buttonFn={signInWithEmailAndPassword} />
    <InfoBox text={errorMessage} isVisible={visibleError} />
  </div >
}

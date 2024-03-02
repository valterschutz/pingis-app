import React, { useContext, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './contexts';
import InfoBox from './components/InfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo.png';
import BigButton from './components/BigButton';

export default function LoginForm() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [infoBoxMessage, setInfoBoxMessage] = useState('')
  const [infoBoxType, setInfoBoxType] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    <div className="flex flex-col justify-center items-center">
      <img className="max-h-60" src={logo} alt="logo" />
      <div className="flex flex-col justify-center items-center">
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
        <BigButton text="Login" onClick={() => signInWithEmailAndPassword(email, password)} />
      </div>
    </div>

    <InfoBox message={infoBoxMessage} type={infoBoxType} />
  </div >
}

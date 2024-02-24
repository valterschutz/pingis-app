import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { FirebaseContext } from './contexts';
import InfoBox from './components/InfoBox';
import logo from './images/logo.png';
import BigButton from './components/BigButton';

function LoginForm() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <div className="flex-grow flex flex-col justify-center items-center">
    <img className="max-h-60" src={logo} alt="logo" />
    <div className="flex flex-col items-center">
      <div className="flex justify-end items-center mb-4">
        <span>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input className="shadow-md bg-white rounded-lg h-10 text-xl px-2 ml-2" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="flex justify-end items-center mb-6">
        <span>
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input className="shadow-md bg-white rounded-lg h-10 text-xl px-2 ml-2" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <BigButton text="Log in" onClick={() => signInWithEmailAndPassword(email, password)} />
    </div>
    // TODO: make this stick to the end using justify-self-end hopefully
    <div className="w-full justify-self-end">

      <InfoBox text={error.message} isVisible={true} />
    </div>
  </div>
}

export default LoginForm;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { FirebaseContext } from './contexts';
import InfoBar from './components/InfoBar';

function SignupForm() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <div>
    <div>
      <label>Email</label>
      <div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <span>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </div>
    </div>
    <div>
      <label>Password</label>
      <div>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <span>
          <FontAwesomeIcon icon={faLock} />
        </span>
      </div>
    </div>
    <div>
      <div>
        <button onClick={() => createUserWithEmailAndPassword(email, password)}>Sign up</button>
      </div>
    </div>
    {error ? <InfoBar text={error.message} modifier="is-danger" /> : null}
  </div>
}

export default SignupForm;

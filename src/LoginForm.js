import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { FirebaseContext } from './contexts';
import InfoBar from './components/InfoBar';

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

  return <div className="my-auto">
    <div className="field">
      <label className="label">Email</label>
      <div className="control has-icons-left has-icons-right">
        <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </div>
      {/* <p className="help is-danger">This email is invalid</p> */}
    </div>
    <div className="field">
      <label className="label">Password</label>
      <div className="control has-icons-left has-icons-right">
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faLock} />
        </span>
      </div>
    </div>
    <div className="field">
      <div className="control">
        <button className={`button ${loading ? 'is-loading' : ''} is-primary`} onClick={() => signInWithEmailAndPassword(email, password)}>Login</button>
      </div>
    </div>
    {error ? <InfoBar text={error.message} modifier="is-danger" /> : null}
  </div>
}

export default LoginForm;

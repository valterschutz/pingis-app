import React, { useContext } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './contexts';
import InfoBar from './components/InfoBar';

function Settings() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [signOut, loading, error] = useSignOut(auth);
  return <>
    <button className="button is-link" onClick={() => signOut()}>Log out</button>
    {error ? <InfoBar text={error.message} modifier="is-danger" /> : null}
  </>
}

export default Settings

import React, { useContext } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './contexts';
import BigButton from './components/BigButton';

function Settings() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [signOut, loading, error] = useSignOut(auth);
  return <div className="flex flex-col flex-grow justify-center items-center">
    <BigButton text="Log out" onClick={() => signOut()} />
  </div>
}

export default Settings

import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import { useState, useContext } from 'react';
import Entries from './Entries';
import Stats from './Stats';
import { FirebaseContext, PlayersContext, MatchesContext } from './contexts';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

const firebaseConfig = {
  apiKey: "AIzaSyB0fVnzGA6ikLwft4VdHt8yrfrgqOKjI7M",
  authDomain: "pingis-app.firebaseapp.com",
  projectId: "pingis-app",
  storageBucket: "pingis-app.appspot.com",
  messagingSenderId: "1099430337028",
  appId: "1:1099430337028:web:2a5177f5972820e7b93351"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

connectFirestoreEmulator(db, 'localhost', 8080)
connectAuthEmulator(auth, 'http://localhost:9099')

function App() {
  const [playersData, playersLoading, playersError, playersSnapshot] = useCollectionData(collection(db, 'players'))
  const [matchesData, matchesLoading, matchesError, matchesSnapshot] = useCollectionData(collection(db, 'matches'))

  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App bg-apricot">
      <FirebaseContext.Provider value={[app, auth, db]}>
        <PlayersContext.Provider value={[playersData, playersLoading, playersError, playersSnapshot]}>
          <MatchesContext.Provider value={[matchesData, matchesLoading, matchesError, matchesSnapshot]}>
            {user ? <LoggedIn /> : <LoggedOut />}
          </MatchesContext.Provider>
        </PlayersContext.Provider>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;

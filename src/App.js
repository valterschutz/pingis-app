import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import Entries from './Entries';
import Stats from './Stats';

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

const playersCollection = collection(db, 'players')
const playersSnapshot = await getDocs(playersCollection)
const playersSnapshotDocs = playersSnapshot.docs
const matchesCollection = collection(db, 'matches')
const matchesSnapshot = await getDocs(matchesCollection)

function App() {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div className="App is-flex is-flex-direction-column is-justify-content-space-between">
      <div className="tabs is-centered is-fullwidth">
        <ul>
          <li class={tabIndex === 0 ? "is-active" : ""}><a onClick={() => setTabIndex(0)}>Entries</a></li>
          <li class={tabIndex === 1 ? "is-active" : ""}><a onClick={() => setTabIndex(1)}>Stats</a></li>
        </ul>
      </div>
      {tabIndex === 0 && <Entries db={db} playersSnapshotDocs={playersSnapshotDocs} matchesCollection={matchesCollection} />}
      {tabIndex === 1 && <Stats matchesSnapshot={matchesSnapshot} />}
    </div>
  );
}

export default App;

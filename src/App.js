import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import { useState } from 'react';
import Entries from './Entries';
import Stats from './Stats';
import { FirebaseContext } from './contexts';

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

// connectFirestoreEmulator(db, 'localhost', 8080)

function App() {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <FirebaseContext.Provider value={[app, null, db]}>
      <div className="App is-flex is-flex-direction-column is-justify-content-space-between">
        <div className="section px-0 py-0">
          <div className="tabs is-centered is-fullwidth">
            <ul>
              <li className={tabIndex === 0 ? "is-active" : ""}><a onClick={() => setTabIndex(0)}>Entries</a></li>
              <li className={tabIndex === 1 ? "is-active" : ""}><a onClick={() => setTabIndex(1)}>Stats</a></li>
            </ul>
          </div>
        </div>
        {tabIndex === 0 && <Entries />}
        {tabIndex === 1 && <Stats />}
        {/* <InfoBar db={db} /> */}
      </div >
    </FirebaseContext.Provider>
  );
}

export default App;

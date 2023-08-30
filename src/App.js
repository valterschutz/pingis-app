import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Dropdown from './components/Dropdown';
import { useState } from 'react';

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
const playersDocsQuery = await getDocs(playersCollection)
const playersDocs = playersDocsQuery.docs
const matchesCollection = collection(db, 'matches')
// const matchesDocsQuery = await getDocs(matchesCollection)
// const matchesDocs = matchesDocsQuery.docs

function App() {
  const [players,] = useState(playersDocs.map(doc => doc.data()))
  const [player1Index, setPlayer1Index] = useState(0)
  const [player2Index, setPlayer2Index] = useState(1)
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  console.log(`${player1Index} ${player2Index}`)

  return (
    <div className="App is-flex is-flex-direction-column is-justify-content-space-between">
      <div className="section">
        <div className="columns">
          <div className="column">
            <Dropdown items={players.map(p => p.firstName)} index={player1Index} setIndex={setPlayer1Index} />
            <input type="number" className="input is-large mt-3" value={player1Score} onChange={e => {
              setPlayer1Score(parseInt(e.target.value))
            }} />
          </div>
          <div className="column">
            <Dropdown items={players.map(p => p.firstName)} index={player2Index} setIndex={setPlayer2Index} />
            <input type="number" className="input is-large mt-3" value={player2Score} onChange={e => setPlayer2Score(parseInt(e.target.value))} />
          </div>
        </div>

        <button className="button is-primary is-large" onClick={async () => {
          try {
            await addDoc(matchesCollection, {
              player1: doc(db, 'players', playersDocs[player1Index].id),
              player2: doc(db, 'players', playersDocs[player2Index].id),
              player1Score: player1Score,
              player2Score: player2Score,
              when: serverTimestamp()
            })
            setPlayer1Score(0)
            setPlayer2Score(0)
            setIsSuccess(true)
            setTimeout(() => {
              setIsSuccess(false)
            }, 3000);
          } catch (error) {
            console.log(`Error: ${error}`);
            setIsError(true)
            setTimeout(() => {
              setIsError(false)
            }, 3000);
          }
        }}>Submit</button>

      </div>
      <div className="section">
      {isError && <div class="notification is-danger">
          Error
        </div>}
        {isSuccess && <div class="notification is-success">
          Submited successfully
        </div>}
      </div>
    </div>
  );
}

export default App;

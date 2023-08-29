import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
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
const players = await getDocs(playersCollection)
// const matchesCollection = collection(db, 'matches')
// const matches = await getDocs(matchesCollection)

players.forEach(doc => {
  console.log(doc.id, ' => ', doc.data());
})

function App() {
  const [players,] = useState(['Valter', 'Filip', 'Victor', 'Lotta', 'Elias'])
  const [player1Index, setPlayer1Index] = useState(0)
  const [player2Index, setPlayer2Index] = useState(1)
  return (
    <div className="App">
      <Dropdown items={players} index={player1Index} setIndex={setPlayer1Index} />
      <Dropdown items={players} index={player2Index} setIndex={setPlayer2Index} />
    </div>
  );
}

export default App;

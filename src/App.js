import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, addDoc, setDoc, collection } from 'firebase/firestore';
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
const matchesCollection = collection(db, 'matches')

const me = doc(db, 'test-collection/7KXAbyo38tfH8EaTlv2t')

console.log(me)

console.log('hello?');

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

function App() {
  const [players, setPlayers] = useState(['Valter', 'Filip', 'Victor', 'Lotta'])
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

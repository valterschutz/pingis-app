import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

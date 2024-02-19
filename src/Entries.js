import { doc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import Dropdown from './components/Dropdown';

function Entries({ db, playersSnapshot }) {
  const playersCollection = collection(db, 'players')
  const matchesCollection = collection(db, 'matches')
  const playersSnapshotDocs = playersSnapshot.docs

  const players = playersSnapshotDocs.map(doc => doc.data())
  const [player1Index, setPlayer1Index] = useState(0)
  const [player2Index, setPlayer2Index] = useState(1)
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [submitText, setSubmitText] = useState("")
  const isError = submitStatus === 'error'
  const player1 = players[player1Index]
  const player2 = players[player2Index]

  return <>
    <div className="section">
      <div className="columns">
        <div className="column is-flex is-flex-direction-column is-align-items-center">
          <Dropdown items={players.map(p => p.firstName)} index={player1Index} setIndex={setPlayer1Index} />
          <div className="is-flex is-flex-direction-row is-align-items-center mt-3">
            <button className="button is-large" onClick={() => { setPlayer1Score(player1Score - 1) }}>-</button>
            <input type="number" className="input is-large has-text-centered" value={player1Score} onChange={e => {
              setPlayer1Score(parseInt(e.target.value))
            }} />
            <button className="button is-large" onClick={() => { setPlayer1Score(player1Score + 1) }}>+</button>
          </div>
        </div>
        <div className="column is-flex is-flex-direction-column is-align-items-center">
          <Dropdown items={players.map(p => p.firstName)} index={player2Index} setIndex={setPlayer2Index} />
          <div className="is-flex is-flex-direction-row is-align-items-center mt-3">
            <button className="button is-large" onClick={() => { setPlayer2Score(player2Score - 1) }}>-</button>
            <input type="number" className="input is-large has-text-centered" value={player2Score} onChange={e => {
              setPlayer2Score(parseInt(e.target.value))
            }} />
            <button className="button is-large" onClick={() => { setPlayer2Score(player2Score + 1) }}>+</button>
          </div>
        </div>
      </div>

      <div className="is-flex is-flex-direction-column is-align-items-center">
        <button className="button is-primary is-large" onClick={async () => {
          try {
            await addDoc(matchesCollection, {
              player1: doc(db, 'players', playersSnapshotDocs[player1Index].id),
              player2: doc(db, 'players', playersSnapshotDocs[player2Index].id),
              player1Score: player1Score,
              player2Score: player2Score,
              when: serverTimestamp()
            })

            // Text to speech stuff
            let msg = new SpeechSynthesisUtterance();


            if (player1Score === player2Score) {
              msg.text = `${player1Score} ${player2Score} draw`;
              setSubmitText(`${player1Score} - ${player2Score} draw`)
            } else {
              const winner = player1Score > player2Score ? player1 : player2
              const winnerScore = player1Score > player2Score ? player1Score : player2Score
              const loserScore = player1Score > player2Score ? player2Score : player1Score
              const loser = player1Score > player2Score ? player2 : player1
              msg.text = `${winner.firstName} won with ${winnerScore} ${loserScore} against ${loser.firstName}`
              setSubmitText(`${winner.firstName} won with ${winnerScore} - ${loserScore} against ${loser.firstName}`)
            }
            window.speechSynthesis.speak(msg);

            setPlayer1Score(0)
            setPlayer2Score(0)
            setSubmitStatus('success')
            setTimeout(() => {
              setSubmitStatus(null)
            }, 6000);
          } catch (error) {
            console.log(`Error: ${error}`);
            setSubmitStatus('error')
            setSubmitText("Error")
            setTimeout(() => {
              setSubmitStatus(null)
            }, 6000);
          }
        }}>Submit</button>
      </div>
    </div>
    <div className="section">
      {submitStatus !== null && <div class={`notification ${isError ? 'is-danger' : 'is-success'}`}>
        {submitText}
      </div>}
    </div>
  </>
}

export default Entries

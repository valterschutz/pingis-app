import { doc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { useState, useContext, useEffect } from 'react';
import Dropdown from './components/Dropdown';
import { FirebaseContext, PlayersContext, MatchesContext } from './contexts';
import ScoreIncrementer from './components/ScoreIncrementer';
import BigButton from './components/BigButton';
import InfoBox from './components/InfoBox';

function Entries() {
  const [app, _, db] = useContext(FirebaseContext)
  const [playersData, playersLoading, playersError, playersSnapshot] = useContext(PlayersContext)
  const [matchesData, matchesLoading, matchesError, matchesSnapshot] = useContext(MatchesContext)
  const players = playersData || []
  const matches = matchesData || []
  const [fireIndex, setFireIndex] = useState(null)


  useEffect(() => {
    // Check if someone is on fire each time a match is added
    if (matches.length > 0) {
      // Null timestamps count as the latest
      matches.sort((a, b) => {
        if (a.when === null) {
          return -1
        } else if (b.when === null) {
          return 1
        }
        return b.when.seconds - a.when.seconds
      }
      )
      // First match is the latest
      const latestMatch = matches[0]
      const latestWinner = latestMatch?.player1Score > latestMatch?.player2Score ? latestMatch.player1 : latestMatch.player2
      const latestLoser = latestMatch?.player1Score > latestMatch?.player2Score ? latestMatch.player2 : latestMatch.player1
      // Loop backwards through matches while the latest winner is still winning and the latest loser is still losing
      for (let i = 1; i < matches.length; i++) {
        const match = matches[i]
        const winner = match?.player1Score > match?.player2Score ? match.player1 : match.player2
        const loser = match?.player1Score > match?.player2Score ? match.player2 : match.player1
        if (winner.id === latestWinner.id) {
          if (loser.id === latestLoser.id) {
            setFireIndex(playersSnapshot.docs.findIndex(p => p.id === latestWinner.id))
            break
          }
        } else {
          setFireIndex(null)
          break
        }
      }
    }
  }, [matches])

  const addMatchFn = async () => {
    try {
      await addDoc(collection(db, 'matches'), {
        player1: doc(db, 'players', playersSnapshot.docs[player1Index].id),
        player2: doc(db, 'players', playersSnapshot.docs[player2Index].id),
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
  }

  // Component state for the UI
  const [player1Index, setPlayer1Index] = useState(0)
  const [player2Index, setPlayer2Index] = useState(1)
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [submitText, setSubmitText] = useState("")
  const isError = submitStatus === 'error'
  const player1 = players[player1Index]
  const player2 = players[player2Index]

  return <div className="flex-grow flex flex-col justify-end items-center">
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Dropdown items={players.map(p => p.firstName)} index={player1Index} setIndex={setPlayer1Index} fireIndex={fireIndex} />
        <ScoreIncrementer score={player1Score} setScore={setPlayer1Score} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Dropdown items={players.map(p => p.firstName)} index={player2Index} setIndex={setPlayer2Index} fireIndex={fireIndex} />
        <ScoreIncrementer score={player2Score} setScore={setPlayer2Score} />
      </div>
      <BigButton text="Submit" onClick={() => addMatchFn()} />
    </div>
    <InfoBox text={submitText} isVisible={submitStatus === 'success'} />
  </div >
}

export default Entries

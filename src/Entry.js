import { doc, serverTimestamp, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { useState, useContext, useEffect, useRef } from 'react';
import Dropdown from './components/Dropdown';
import { FirebaseContext, PlayersContext, MatchesContext, SettingsContext } from './contexts';
import ScoreIncrementer from './components/ScoreIncrementer';
import BigButton from './components/BigButton';
import InfoBox from './components/InfoBox';
import PlayerMenu from './components/PlayerMenu';

function Entry() {
  const [app, auth, db] = useContext(FirebaseContext)
  const [settings, setSettings] = useContext(SettingsContext)
  const [playersData, playersLoading, playersError, playersSnapshot] = useContext(PlayersContext)
  const [matchesData, matchesLoading, matchesError, matchesSnapshot] = useContext(MatchesContext)
  const players = playersData || []
  const matches = matchesData || []
  const [fireIndex, setFireIndex] = useState(null)

  // Component state for the UI
  const [player1Index, setPlayer1Index] = useState(0)
  const [player2Index, setPlayer2Index] = useState(1)
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [infoBoxMessage, setInfoBoxMessage] = useState('')
  const [infoBoxType, setInfoBoxType] = useState('')
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const addedDocRef = useRef(null) // This is used to allow removing of the doc for 10 seconds after adding it
  const [undoAvailable, setUndoAvailable] = useState(false) // This is used to allow removing of the doc for 10 seconds after adding it
  const player1 = players[player1Index]
  const player2 = players[player2Index]

  // Some players might not have a display name, so we'll set it to their first name
  players.forEach(async (player) => {
    player.displayName = player.displayName || player.firstName
  })


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

  const undoMatchFn = async () => {
    try {
      setSubmitIsLoading(true)
      await deleteDoc(addedDocRef.current)
      setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: Successfully removed match`)
      setInfoBoxType('success')
      setSubmitIsLoading(false)
      setUndoAvailable(false)
    } catch (error) {
      setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: ${error}`)
      setInfoBoxType('error')
    }
  }

  const addMatchFn = async () => {
    try {
      setSubmitIsLoading(true)
      const docRef = await addDoc(collection(db, 'matches'), {
        player1: doc(db, 'players', playersSnapshot.docs[player1Index].id),
        player2: doc(db, 'players', playersSnapshot.docs[player2Index].id),
        player1Score: player1Score,
        player2Score: player2Score,
        when: serverTimestamp(),
        addedByUID: auth.currentUser.uid,
      })
      setSubmitIsLoading(false)
      // Allow removing of doc for 10 seconds afterwards (if undo is enabled in settings)
      if (settings.undoEnabled) {
        addedDocRef.current = docRef
        setUndoAvailable(true)
        setTimeout(() => {
          setUndoAvailable(false)
        }, settings.undoTimeout * 1000)
      }

      // Text to speech stuff
      let msg = new SpeechSynthesisUtterance();


      if (player1Score === player2Score) {
        msg.text = `${player1Score} ${player2Score} draw`;
        setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: ${player1Score} - ${player2Score} draw`)
        setInfoBoxType('info')
      } else {
        const winner = player1Score > player2Score ? player1 : player2
        const winnerScore = player1Score > player2Score ? player1Score : player2Score
        const loserScore = player1Score > player2Score ? player2Score : player1Score
        const loser = player1Score > player2Score ? player2 : player1
        msg.text = `${winner.displayName} won with ${winnerScore} ${loserScore} against ${loser.displayName}`
        setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: ${winner.displayName} won with ${winnerScore} - ${loserScore} against ${loser.displayName}`)
        setInfoBoxType('info')
      }
      window.speechSynthesis.speak(msg);

      setPlayer1Score(0)
      setPlayer2Score(0)
    } catch (error) {
      // Loading might have been set to true right before the error, so we'll set it to false again
      setSubmitIsLoading(false)
      setInfoBoxMessage(`${new Date(Date.now()).toLocaleTimeString()}: ${error}`)
      setInfoBoxType('error')
    }
  }


  return <>
    <div className="flex-grow flex flex-col justify-center items-center">
      <div className="flex flex-col gap-12 justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <Dropdown items={players.map(p => p.displayName)} index={player1Index} setIndex={setPlayer1Index} fireIndex={fireIndex} />
          <ScoreIncrementer score={player1Score} setScore={setPlayer1Score} />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Dropdown items={players.map(p => p.displayName)} index={player2Index} setIndex={setPlayer2Index} fireIndex={fireIndex} />
          <ScoreIncrementer score={player2Score} setScore={setPlayer2Score} />
        </div>
        {
          undoAvailable ? <BigButton text="Undo?" onClick={() => undoMatchFn()} isLoading={submitIsLoading} />
            : <BigButton text="Submit" onClick={() => addMatchFn()} isLoading={submitIsLoading} />
        }
      </div>
    </div >
    <InfoBox message={infoBoxMessage} type={infoBoxType} />
  </>
}

export default Entry

import { useContext } from "react"
import { PlayersContext } from "./contexts"

export default function MatchView({ match }) {
  const [playersData, playersLoading, playersError, playersSnapshot] = useContext(PlayersContext)
  // `match` contains: {player1, player2, player1Score, player2Score, when}
  // where player1 and player2 are doc references to the players collection
  const { player1: player1Ref, player2: player2Ref, player1Score, player2Score, when } = match
  const player1Doc = playersSnapshot.docs.find(p => p.id === player1Ref.id)
  const player2Doc = playersSnapshot.docs.find(p => p.id === player2Ref.id)

  // Get player names from the doc references
  //   const [playersData, playersLoading, playersError, playersSnapshot] = useContext(PlayersContext)
  //   const player1Doc = playersSnapshot.docs.find(p => p.id === match.player1.id)
  const player1Data = player1Doc.data()
  const player1Name = player1Data?.displayName || player1Data.firstName
  //   const player2Doc = playersSnapshot.docs.find(p => p.id === match.player2.id)
  const player2Data = player2Doc.data()
  const player2Name = player2Data?.displayName || player2Data.firstName
  return (
    <div className="w-full flex flex-row justify-between gap-1 items-center text-white">
      <div className="bg-darkbrown text-xl h-10 rounded-lg w-36 px-2 py-1 text-center flex justify-center items-center overflow-hidden">{player1Name}</div>
      <div className="rounded-lg bg-white text-darkbrown h-10 w-14 text-xl text-center flex justify-center items-center font-bold font-kode px-1">{player1Score}-{player2Score}</div>
      <div className="bg-darkbrown text-xl h-10 rounded-lg w-36 px-2 py-1 text-center flex justify-center items-center">{player2Name}</div>
    </div>
  )
}

import MatchView from "./MatchView"
import { useContext } from "react"
import { MatchesContext } from "./contexts"

export default function MatchesView() {
  // Get latest 10 matches
  const [matchesData, matchesLoading, matchesError, matchesSnapshot] = useContext(MatchesContext)
  const sortedMatches = matchesData || []
  sortedMatches.sort((a, b) => b.when - a.when)
  const latestMatches = sortedMatches.slice(0, 10)

  return (
    <div className="flex-grow flex flex-row justify-center">
      <div className="max-w-xl flex-grow flex flex-col justify-center items-center gap-6 px-2">
        <h2 className="underline text-4xl font-kanit">Last 10 matches</h2>
        {latestMatches.map((match, idx) => <MatchView key={idx} match={match} />)}
      </div>
    </div>
  )
}

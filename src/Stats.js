import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { useContext } from 'react';
import { MatchesContext, PlayersContext } from './contexts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const winLossDrawOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Wins, losses, and draws',
    },
  },
};

const winRatioOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Win ratio',
    },
  },
};

function Stats() {
  const [playersData, playersLoading, playersError, playersSnapshot] = useContext(PlayersContext)
  const [matchesData, matchesLoading, matchesError, matchesSnapshot] = useContext(MatchesContext)
  const players = playersData || []
  const matches = matchesData || []
  const playersNames = players.map(p => `${p.firstName} ${p.lastName}`)

  // Loop through all matches and calculate wins, losses, and draws for each player
  const scoring = matches.reduce((acc, match) => {
    const { player1: player1Doc, player2: player2Doc, player1Score, player2Score } = match
    const player1 = playersSnapshot.docs.find(doc => doc.id === player1Doc.id).data()
    const player2 = playersSnapshot.docs.find(doc => doc.id === player2Doc.id).data()
    const player1Name = `${player1.firstName} ${player1.lastName}`
    const player2Name = `${player2.firstName} ${player2.lastName}`
    if (player1Score > player2Score) {
      acc[player1Name].wins++
      acc[player2Name].losses++
    } else if (player1Score < player2Score) {
      acc[player1Name].losses++
      acc[player2Name].wins++
    } else {
      acc[player1Name].draws++
      acc[player2Name].draws++
    }
    return acc
  }, playersNames.reduce((acc, playerName) => {
    acc[playerName] = { wins: 0, losses: 0, draws: 0 }
    return acc
  }, {}))

  const winLossDrawData = {
    labels: playersNames,
    datasets: [
      {
        label: 'Wins',
        data: playersNames.map(playerName => scoring[playerName].wins),
        borderColor: 'hsl(141, 71%, 48%)',
        backgroundColor: 'hsla(141, 71%, 48%, 0.5)',
        stack: 0,
      },
      {
        label: 'Losses',
        data: playersNames.map(playerName => scoring[playerName].losses),
        borderColor: 'hsl(348, 100%, 61%)',
        backgroundColor: 'hsla(348, 100%, 61%, 0.5)',
        stack: 0,
      },
      {
        label: 'Draws',
        data: playersNames.map(playerName => scoring[playerName].draws),
        borderColor: 'hsl(48, 100%, 67%)',
        backgroundColor: 'hsla(48, 100%, 67%, 0.5)',
        stack: 0,
      },
    ],
  };

  const winRatioData = {
    labels: playersNames,
    datasets: [
      {
        label: 'Win Ratio',
        data: playersNames.map((name) => {
          const wins = scoring[name].wins
          const losses = scoring[name].losses
          return losses !== 0 ? (wins / (wins + losses)).toFixed(2) : wins.toFixed(2);
        }),
        borderColor: 'hsl(219, 100%, 50%)',
        backgroundColor: 'hsla(219, 100%, 50%, 0.5)',
      },
    ],
  };

  return <div className="section my-auto px-1 py-3">
    <Bar data={winLossDrawData} options={winLossDrawOptions} />
    <Bar data={winRatioData} options={winRatioOptions} />
  </div>

}

export default Stats

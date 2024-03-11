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

const winLossDrawPlotOptions = {
  scales: {
    x: {
      ticks: {
        font: {
          size: 14, // Change font size for x-axis labels
          weight: 'normal' // Change font weight for x-axis labels
        }
      }
    },
    y: {
      ticks: {
        autoSkip: false,
        font: {
          size: 14, // Change font size for y-axis labels
          weight: 'normal' // Change font weight for y-axis labels
        }
      }
    }
  },


  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  //   aspectRatio: 1,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 14, // Change font size
          weight: 'normal' // Change font weight
        }
      }
    },
    title: {
      display: true,
      text: 'Wins, losses, and draws',
      font: {
        size: 20,
        weight: 'bold',
      }
    },
  },
};

const winRatioPlotOptions = {
  scales: {
    x: {
      ticks: {
        font: {
          size: 14, // Change font size for x-axis labels
          weight: 'normal' // Change font weight for x-axis labels
        }
      }
    },
    y: {
      ticks: {
        autoSkip: false,
        font: {
          size: 14, // Change font size for y-axis labels
          weight: 'normal' // Change font weight for y-axis labels
        }
      }
    }
  },

  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  //   aspectRatio: 1,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Win ratio',
      font: {
        size: 20,
        weight: 'bold',
      }
    },
  },
};

function Stats() {
  const [playersData, playersLoading, playersError, playersSnapshot] = useContext(PlayersContext)
  const [matchesData, matchesLoading, matchesError, matchesSnapshot] = useContext(MatchesContext)
  const players = playersData || []
  const playersNames = players.map(p => p?.displayName || p.firstName)
  // Only count matches where at least one player has a strictly positive score
  // and both players have a non-negative score
  const m = matchesData || []
  const matches = m.filter(match => (match.player1Score > 0 || match.player2Score > 0) && (match.player1Score >= 0 && match.player2Score >= 0))

  // Loop through all matches and calculate wins, losses, and draws for each player
  const scoring = matches.reduce((acc, match) => {
    const { player1: player1Doc, player2: player2Doc, player1Score, player2Score } = match
    const player1 = playersSnapshot.docs.find(doc => doc.id === player1Doc.id).data()
    const player2 = playersSnapshot.docs.find(doc => doc.id === player2Doc.id).data()
    const player1Name = player1?.displayName || player1.firstName
    const player2Name = player2?.displayName || player2.firstName
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

  // Now sorting the players by matches played
  // Sort player names by matches played
  const sortedByMatchesPlayedPlayersNames = playersNames.sort((a, b) => {
    const aMatches = scoring[a].wins + scoring[a].losses + scoring[a].draws
    const bMatches = scoring[b].wins + scoring[b].losses + scoring[b].draws
    return bMatches - aMatches
  })

  const winLossDrawPlotData = {
    labels: sortedByMatchesPlayedPlayersNames,
    datasets: [
      {
        label: 'Wins',
        data: sortedByMatchesPlayedPlayersNames.map(playerName => scoring[playerName].wins),
        borderColor: 'hsl(141, 71%, 48%)',
        backgroundColor: 'hsla(141, 71%, 48%, 0.5)',
        stack: 0,
      },
      {
        label: 'Losses',
        data: sortedByMatchesPlayedPlayersNames.map(playerName => scoring[playerName].losses),
        borderColor: 'hsl(348, 100%, 61%)',
        backgroundColor: 'hsla(348, 100%, 61%, 0.5)',
        stack: 0,
      },
      {
        label: 'Draws',
        data: sortedByMatchesPlayedPlayersNames.map(playerName => scoring[playerName].draws),
        borderColor: 'hsl(48, 100%, 67%)',
        backgroundColor: 'hsla(48, 100%, 67%, 0.5)',
        stack: 0,
      },
    ],
  };

  const winRatioData = playersNames.map((name) => {
    const wins = scoring[name].wins
    const losses = scoring[name].losses
    return losses !== 0 ? (wins / (wins + losses)).toFixed(2) : wins.toFixed(2);
  })
  // Now sorting the players by win ratio
  const winRatioDataIndices = Array.from(winRatioData.keys())
  const sortedWinRatioDataIndices = winRatioDataIndices.sort((a, b) => winRatioData[b] - winRatioData[a])
  const sortedWinRatioData = sortedWinRatioDataIndices.map(i => winRatioData[i])
  const sortedPlayersNames = sortedWinRatioDataIndices.map(i => playersNames[i])

  const winRatioPlotData = {
    labels: sortedPlayersNames,
    datasets: [
      {
        label: 'Win Ratio',
        data: sortedWinRatioData,
        borderColor: 'hsl(219, 100%, 50%)',
        backgroundColor: 'hsla(219, 100%, 50%, 0.5)',
      },
    ],
  };

  const chartHeight = 40 * playersNames.length

  return <div className="bg-white p-4 flex flex-col gap-2">
    <div style={{ height: chartHeight }}>
      <Bar data={winLossDrawPlotData} options={winLossDrawPlotOptions} />
    </div>
    <div style={{ height: chartHeight }}>
      <Bar data={winRatioPlotData} options={winRatioPlotOptions} />
    </div>
  </div>

}

export default Stats

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import { getDoc } from 'firebase/firestore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Wins, losses, and draws',
    },
  },
};

function Stats({ matchesSnapshot }) {
  const [playersData, setPlayersData] = useState({})
  const playersNames = Object.keys(playersData)
  const playersValues = Object.values(playersData)
  //   const playerNames = ['Valter', 'Johan', 'Kalle']
  //   const playersData = {
  //     'Valter': { name: 'Valter', wins: 2, losses: 1, draws: 0 },
  //     'Johan': { name: 'Johan', wins: 1, losses: 2, draws: 0 },
  //     'Kalle': { name: 'Kalle', wins: 1, losses: 1, draws: 1 },
  //   }

  const data = {
    labels: playersNames,
    datasets: [
      {
        label: 'Wins',
        data: playersNames.map((name) => playersData[name].wins),
        borderColor: 'hsl(141, 71%, 48%)',
        backgroundColor: 'hsla(141, 71%, 48%, 0.5)',
      },
      {
        label: 'Losses',
        data: playersNames.map((name) => playersData[name].losses),
        borderColor: 'hsl(348, 100%, 61%)',
        backgroundColor: 'hsla(348, 100%, 61%, 0.5)',
      },
      {
        label: 'Draws',
        data: playersNames.map((name) => playersData[name].draws),
        borderColor: 'hsl(48, 100%, 67%)',
        backgroundColor: 'hsla(48, 100%, 67%, 0.5)',
      },
    ],
  };

  useEffect(() => {
    // Temporary player data during calculation
    const pd = {}
    const fetchData = async () => {
      await Promise.all(matchesSnapshot.forEach(async doc => {
        const { player1, player2, player1Score, player2Score } = doc.data()
        const player1Doc = await getDoc(player1)
        const player1Data = player1Doc.data()
        const player2Doc = await getDoc(player2)
        const player2Data = player2Doc.data()
        const player1Name = `${player1Data.firstName} ${player1Data.lastName}`
        const player2Name = `${player2Data.firstName} ${player2Data.lastName}`
        // If some player is not in the data, add them
        if (!playersData[player1Name]) {
          playersData[player1Name] = { name: player1Name, wins: 0, losses: 0, draws: 0 }
        }
        if (!playersData[player2Name]) {
          playersData[player2Name] = { name: player2Name, wins: 0, losses: 0, draws: 0 }
        }
        // Calculate wins, losses, and draws
        if (player1Score > player2Score) {
          playersData[player1Name].wins++
          playersData[player2Name].losses++
        } else if (player1Score < player2Score) {
          playersData[player2Name].wins++
          playersData[player1Name].losses++
        } else {
          playersData[player1Name].draws++
          playersData[player2Name].draws++
        }
      }))
      console.log(pd);
      setPlayersData(pd)
    }
    fetchData()
  }, [matchesSnapshot])

  return <Bar data={data} options={options} />
}

export default Stats

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
import { getDocs, collection } from 'firebase/firestore';

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

const winRatioOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
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

function Stats({ db }) {
  const [playersData, setPlayersData] = useState({})
  const playersNames = Object.keys(playersData)

  const winLossDrawData = {
    labels: playersNames,
    datasets: [
      {
        label: 'Wins',
        data: playersNames.map((name) => playersData[name]?.wins || 0),
        borderColor: 'hsl(141, 71%, 48%)',
        backgroundColor: 'hsla(141, 71%, 48%, 0.5)',
        stack: 0,
      },
      {
        label: 'Losses',
        data: playersNames.map((name) => playersData[name]?.losses || 0),
        borderColor: 'hsl(348, 100%, 61%)',
        backgroundColor: 'hsla(348, 100%, 61%, 0.5)',
        stack: 0,
      },
      {
        label: 'Draws',
        data: playersNames.map((name) => playersData[name]?.draws || 0),
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
          const wins = playersData[name]?.wins || 0;
          const losses = playersData[name]?.losses || 0;
          return losses !== 0 ? (wins / (wins + losses)).toFixed(2) : wins.toFixed(2);
        }),
        borderColor: 'hsl(219, 100%, 50%)',
        backgroundColor: 'hsla(219, 100%, 50%, 0.5)',
      },
    ],
  };


  useEffect(() => {
    const fetchData = async () => {
      const matchesSnapshot = await getDocs(collection(db, 'matches'))
      let pd = {}
      matchesSnapshot.forEach(async (doc) => {
        const { player1, player2, player1Score, player2Score } = doc.data()
        const player1ID = player1.id
        const player2ID = player2.id

        // Update player 1
        if (!pd[player1ID]) {
          pd[player1ID] = { wins: 0, losses: 0, draws: 0 }
        }
        if (player1Score > player2Score) {
          pd[player1ID].wins++
        } else if (player1Score < player2Score) {
          pd[player1ID].losses++
        } else {
          pd[player1ID].draws++
        }

        // Update player 2
        if (!pd[player2ID]) {
          pd[player2ID] = { wins: 0, losses: 0, draws: 0 }
        }
        if (player2Score > player1Score) {
          pd[player2ID].wins++
        } else if (player2Score < player1Score) {
          pd[player2ID].losses++
        } else {
          pd[player2ID].draws++
        }
      })
      setPlayersData(pd)
    }
    fetchData()
  }, [])

  return <div className="section my-auto px-1 py-3">
    <Bar data={winLossDrawData} options={winLossDrawOptions} />
    <Bar data={winRatioData} options={winRatioOptions} />
  </div>

}

export default Stats

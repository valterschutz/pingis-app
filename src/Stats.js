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
import { getDoc, getDocs, collection } from 'firebase/firestore';

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


function Stats({ db }) {
  //   const matchesCollection = collection(db, 'matches')

  const [playersData, setPlayersData] = useState({})
  const playersNames = Object.keys(playersData)
  //   console.log(playersData);
  //   console.log(playersNames);
  //   const playerNames = ['Valter', 'Johan', 'Kalle']
  const fakePlayersData = {
    'Valter': { name: 'Valter', wins: 2, losses: 1, draws: 0 },
    'Johan': { name: 'Johan', wins: 1, losses: 2, draws: 0 },
    'Kalle': { name: 'Kalle', wins: 1, losses: 1, draws: 1 },
  }
  const fakePlayersNames = Object.keys(fakePlayersData)

  const data = {
    labels: playersNames,
    datasets: [
      {
        label: 'Wins',
        data: playersNames.map((name) => playersData[name]?.wins || 0),
        borderColor: 'hsl(141, 71%, 48%)',
        backgroundColor: 'hsla(141, 71%, 48%, 0.5)',
      },
      {
        label: 'Losses',
        data: playersNames.map((name) => playersData[name]?.losses || 0),
        borderColor: 'hsl(348, 100%, 61%)',
        backgroundColor: 'hsla(348, 100%, 61%, 0.5)',
      },
      {
        label: 'Draws',
        data: playersNames.map((name) => playersData[name]?.draws || 0),
        borderColor: 'hsl(48, 100%, 67%)',
        backgroundColor: 'hsla(48, 100%, 67%, 0.5)',
      },
    ],
  };
  const fakeData = {
    labels: fakePlayersNames,
    datasets: [
      {
        label: 'Wins',
        data: fakePlayersNames.map((name) => fakePlayersData[name]?.wins || 0),
        borderColor: 'hsl(141, 71%, 48%)',
        backgroundColor: 'hsla(141, 71%, 48%, 0.5)',
      },
      {
        label: 'Losses',
        data: fakePlayersNames.map((name) => fakePlayersData[name]?.losses || 0),
        borderColor: 'hsl(348, 100%, 61%)',
        backgroundColor: 'hsla(348, 100%, 61%, 0.5)',
      },
      {
        label: 'Draws',
        data: fakePlayersNames.map((name) => fakePlayersData[name]?.draws || 0),
        borderColor: 'hsl(48, 100%, 67%)',
        backgroundColor: 'hsla(48, 100%, 67%, 0.5)',
      },
    ],
  };
  //   console.log(data);

  useEffect(() => {
    // Temporary player data during calculation
    let pd = { ...playersData }
    const fetchData = async () => {
      const matchesSnapshot = await collection(db, 'matches').get()
      matchesSnapshot.forEach(async (doc) => {
        const { player1, player2, player1Score, player2Score } = doc.data()
        const player1Doc = await getDoc(player1)
        const player1Data = player1Doc.data()
        const player2Doc = await getDoc(player2)
        const player2Data = player2Doc.data()
        const player1Name = `${player1Data.firstName} ${player1Data.lastName}`
        const player2Name = `${player2Data.firstName} ${player2Data.lastName}`
        // If some player is not in the data, add them
        if (!(player1Name in pd)) {
          pd[player1Name] = { name: player1Name, wins: 0, losses: 0, draws: 0 }
        }
        if (!(player2Name in pd)) {
          pd[player2Name] = { name: player2Name, wins: 0, losses: 0, draws: 0 }
        }
        // Calculate wins, losses, and draws
        if (player1Score > player2Score) {
          pd[player1Name].wins++
          pd[player2Name].losses++
        } else if (player1Score < player2Score) {
          pd[player2Name].wins++
          pd[player1Name].losses++
        } else {
          pd[player1Name].draws++
          pd[player2Name].draws++
        }
      })
      console.log('pd before setting state');
      console.log(pd);
      setPlayersData(pd)
    }
    fetchData()
  }, [])

  //   console.log(fakePlayersData);
  //   console.log(playersData);
  console.log('playersData:');
  console.log(playersData);
  console.log('playersNames:');
  console.log(playersNames);

  //   return <Bar data={data} options={options} />
  return playersData ? <Bar data={data} options={options} /> : <div>Loading...</div>;

}

export default Stats

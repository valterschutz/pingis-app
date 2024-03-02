import React from 'react';

const PlayerMenu = ({ players, onSelectPlayer }) => {
  return <div className="max-h-12 overflow-y-auto border border-gray-200 rounded-md">
    <ul className="divide-y divide-gray-200">
      {players.map((player, index) => <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onSelectPlayer(player)}>
        {"hello"}
      </li>
      )}
    </ul>
  </div>
};

export default PlayerMenu;

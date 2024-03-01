import React, { useState } from 'react';

export default function ToggleSwitch({ toggleState, onToggle }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={toggleState} onChange={() => onToggle(!toggleState)} />
      <span className="slider round"></span>
    </label>
  );
}

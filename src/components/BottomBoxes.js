import React, { useState } from 'react';
import { BOTTOM_BOX_OPTIONS, getAssetsForFolder } from '../utils/assets';

function BottomBoxes({ onBoxSelect }) {
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (label) => {
    setSelectedBox(label);
    onBoxSelect(getAssetsForFolder(label));
  };

  return (
    <div id="bottomBoxes" className="bottom-boxes">
      {BOTTOM_BOX_OPTIONS.map((label) => (
        <button
          key={label}
          type="button"
          className={`number-box ${selectedBox === label ? 'active' : ''}`}
          onClick={() => handleBoxClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default BottomBoxes;

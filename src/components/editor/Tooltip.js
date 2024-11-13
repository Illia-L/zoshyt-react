// Tooltip.js
import React, { useState } from 'react';

export default function Tooltip({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='tooltip-container'>
      <div
        className='tooltip-icon'
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <svg
          width='32'
          height='32'
        >
          <use href='/images/icons.svg#help'></use>
        </svg>
      </div>
      {isVisible && <div className='tooltip-box'>{children}</div>}
    </div>
  );
}

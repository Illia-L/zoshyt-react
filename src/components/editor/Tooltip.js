import React, { useState } from 'react';
import styles from './Tooltip.module.css'
import { Svg } from './Svg';

export default function Tooltip({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={styles.icon}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Svg id='help'/>
      </div>
      {isVisible && <div className={styles.box}>{children}</div>}
    </div>
  );
}

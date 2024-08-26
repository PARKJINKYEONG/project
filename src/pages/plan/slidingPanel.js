import React from 'react';
import styles from '../../styles/slidingPanel.module.css';

function SlidingPanel({ isOpen, onClose }) {
  return (
    <div className={isOpen ? styles.panel : `${styles.panel} ${styles.hidden}`}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
        <div>
          <h3></h3>
          <p></p>
        </div>      
    </div>
  );
}

export default SlidingPanel;

import React from 'react';
import GuestCounterItem from './guestCounterItem';

import styles from '../styles/bookmarkDetails.module.css'


function GuestCounter({ guests, handleGuestChange }) {
  return (
    <div className={styles['guest-counter']}>
      {guests.map(({ type, label, value, minValue }) => (
        <GuestCounterItem
          key={type}
          label={label}
          value={value}
          onIncrement={() => handleGuestChange(type, 'increment')}
          onDecrement={() => handleGuestChange(type, 'decrement')}
          minValue={minValue}
        />
      ))}
    </div>
  );
}

export default GuestCounter;

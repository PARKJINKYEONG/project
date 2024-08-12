import React from 'react';

function GuestCounterItem({ label, value, onIncrement, onDecrement, minValue = 0 }) {
  return (
    <div>
      <span>{label}</span>
      <button onClick={onDecrement} disabled={value <= minValue}>-</button>
      <span>{value}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  );
}

export default GuestCounterItem;

import React from 'react';
import { TextField } from '@mui/material';
import styles from '../styles/changeInfo.module.css';

const PhoneInput = ({ phone, setPhone }) => {
  
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;

    if (!/^\d*$/.test(value)) {
      return;
    }

    if ((name === 'part1' && value.length > 3) ||
        (name === 'part2' && value.length > 4) ||
        (name === 'part3' && value.length > 4)) {
      return;
    }

    setPhone((prevPhone) => ({
      ...prevPhone,
      [name]: value,
    }));

    if (name === 'part1' && value.length === 3) {
      document.querySelector('#part2').focus();
    } else if (name === 'part2' && value.length === 4) {
      document.querySelector('#part3').focus();
    }
  };

  return (
    <div className={styles.privacyItem}>
      <label className={styles.formLabel}>전화번호 변경</label>
        <div className={styles.inputGroup}>
            <TextField 
            variant="outlined" onChange={handlePhoneChange} style={{ flex: '1 1 auto', marginRight: '10px' }} 
            id='part1' name='part1' value={phone.part1} />
            <TextField 
            variant="outlined" onChange={handlePhoneChange} style={{ flex: '1 1 auto', marginRight: '10px' }} 
            id='part2' name='part2' value={phone.part2} />
            <TextField 
            variant="outlined" onChange={handlePhoneChange} style={{ flex: '1 1 auto', marginRight: '10px' }} 
            id='part3' name='part3' value={phone.part3} />

        </div>
    </div>
  );
};

export default PhoneInput;

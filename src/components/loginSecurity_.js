import React from 'react';
import { TextField } from '@mui/material';

import styles from '../styles/loginSecurity.module.css';


//...props는 다른 속성을 전달하고 싶을 때 사용.
const InputField = ({ label, value, onChange, type = 'text', ...props }) => {
  return (
    <div className={styles.privacyItem}>
      <label className={styles.formLabel}>{label}</label>
      <div className={styles.inputGroup}>
        <TextField
          value={value}
          onChange={onChange}
          variant="outlined"
          fullWidth
          type={type}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;

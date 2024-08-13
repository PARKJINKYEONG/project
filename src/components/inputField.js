import React from 'react';
import { TextField, Button } from '@mui/material';

import styles from '../styles/changeInfo.module.css';

const InputField = ({ label, value, onChange, type = 'text', onButtonClick, buttonLabel, buttonVariant = 'outlined', buttonStyle = { width: '80px' }, ...props }) => {
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
        {onButtonClick && (
          <Button
            variant={buttonVariant}
            onClick={onButtonClick}
            className="ms-2"
            style={buttonStyle}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default InputField;

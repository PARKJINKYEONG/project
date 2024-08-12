import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';

import styles from '../styles/accountLock.module.css';


function RadioGroupSection({ title, options, value, onChange, otherReason, onOtherReasonChange }) {
  return (
    <div className={styles.privacyItem}>
      <label className={styles.formLabel}>{title}</label>
      <div className={styles.inputGroup}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby={`${title}-radio-group-label`}
            name={`${title}-radio-group`}
            value={value}
            onChange={onChange}
          >
            {options.map(option => (
              <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      {value === '기타' && (
        <div className={styles.inputGroup}>
          <TextField
            label="기타 사유"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={otherReason}
            onChange={onOtherReasonChange}
          />
        </div>
      )}
    </div>
  );
}

export default RadioGroupSection;

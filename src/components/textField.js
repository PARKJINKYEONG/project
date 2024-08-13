import React from 'react';
import { TextField } from '@mui/material';

function TextField_({ label, value, onChange, multiline = false, readOnly = false, rows = 1 }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      multiline={multiline}
      rows={rows} // rows 속성 추가
      variant="outlined"
      margin="normal"
      InputProps={{
        readOnly: readOnly,
      }}
    />
  );
}

export default TextField_;

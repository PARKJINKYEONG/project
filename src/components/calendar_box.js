import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import { Box } from '@mui/material';

const Calendar = ({ sx }) => {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>      
          <Box sx={{ width: '100%', ...sx }}>  
            <DateCalendar sx={sx}/>
          </Box>
        </LocalizationProvider> 
      );
  };


export default Calendar;
import React from "react";
// import styles from '../../styles/planManagement.module.css';
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from "@mui/material";

const PlanManagement = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
        <DateCalendar />
      </Box>
      </LocalizationProvider>    
    ); 
}

export default PlanManagement;
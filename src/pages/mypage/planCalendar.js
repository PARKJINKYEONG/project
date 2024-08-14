
import React, { useState } from 'react';
import Calendar from '../../components/calendar';
import { Box, Button, Modal } from '@mui/material';
import ProgressPlan3 from '../plan/progressPlan3';
import ProgressPlan2 from '../plan/progressPlan2';
import ProgressPlan4 from '../plan/progressPlan4';
import PlanListView from './planListView';


const PlanCalendar = () => {

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setOpen(true);
    setCurrentStep(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 2:
        return <ProgressPlan2 event={selectedEvent} />;
      case 3:
        return <ProgressPlan3 event={selectedEvent} />;
      case 4:
        return <ProgressPlan4 event={selectedEvent} />;
      default:
        return <PlanListView event={selectedEvent} onEdit={setCurrentStep} />;
    }
  };

  return (
    <div style={{ marginTop: '20px' , marginRight: '100px'}}>
      <Calendar onEventClick={handleEventClick}/>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 600, padding: 5, backgroundColor: 'white', margin: 'auto', marginTop: '10%',
            overflowY: 'auto',borderRadius: 2 }}>
          {selectedEvent && renderStepComponent()}
          <Button onClick={handleClose} variant="contained" color="primary">닫기</Button>
        </Box>
      </Modal>
    </div> 
  ); 
}

export default PlanCalendar;
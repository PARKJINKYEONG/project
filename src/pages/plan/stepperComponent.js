import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import styles from '../../styles/stepperComponent.module.css';
import { useNavigate } from 'react-router-dom';

function StepperComponent({ activeStep, handleButtonClick, handleBack, handleReset, handleStep }) {
  const [open, setOpen] = useState(false);
  
  
  const steps = [
    { label: '장소 및 날짜 선택' },
    { label: '관광지' },
    { label: '숙소 선택' },
    { label: 'AI 추천' },
    { label: '전체 일정' }
  ];

  const handleComplete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
     
  };

  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => (
        <div key={step.label} className={styles.stepButtonContainer}>
          <Button 
            size="medium" 
            variant={activeStep === index ? "contained" : "text"} 
            fullWidth
            onClick={handleStep(index)}
            className={`${activeStep === index ? styles.customActiveButton : styles.customOutlinedButton}`}
          >
            <Typography component="span">
              {`STEP ${index + 1}`}
            </Typography>
            <Typography component="span" className={styles.stepLabel}>
              {step.label}
            </Typography>
          </Button>
        </div>
      ))}
      <div className={styles.nextButtonContainer}>
        <Button 
          onClick={activeStep === steps.length - 1 ? handleComplete : handleButtonClick}           
          fullWidth 
          className={`${styles.activeButton}`}
        >
          {activeStep === steps.length - 1 ? '저장' : activeStep === steps.length ? '완료' : '다음'}
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>저장 하시겠습니까</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            아니오
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            예
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}

export default StepperComponent;

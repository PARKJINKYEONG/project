import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import styles from '../../styles/plan/createPlan/stepperComponent.module.css';
import { useNavigate } from 'react-router-dom';

function savePlan(){
  console.log('savePlan');
}

function resetPlan(){
  console.log('resetPlan');
}

function StepperComponent({ activeStep, handleButtonClick, handleBack, handleReset, handleStep }) {
  const [open, setOpen] = useState(false);


  const steps = [
    { label: '정보 입력' },
    { label: '관광지 추천' },
    { label: '숙소 추천' },
    { label: '계획 추천' },
    { label: '계획 완성' }
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
            <span className={styles.stepNumber}>
              {`Step ${index + 1}`}
            </span>
            {activeStep === index ?
              <span className={styles.stepLabel}>
                {step.label}
              </span>
              : ''}

          </Button>
        </div>
      ))}
        <div className={styles.saveButtonContainer}>
          <button className={styles.customIconButton} onClick={savePlan} >
            <img src='/images/icons/floppy.svg' alt ="저장" width='24px' height='24px'/>
          </button>
        </div>
        <div className={styles.saveButtonContainer}>
          <button className={styles.customIconButton} onClick={resetPlan} >
            <img src='/images/icons/reset.svg' alt ="저장" width='24px' height='24px'/>
          </button>
        </div>
      <Dialog open={open} onClose={handleClose} >
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

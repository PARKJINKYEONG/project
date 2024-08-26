import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import styles from '../../styles/stepperComponent.module.css';

function StepperComponent({ activeStep, handleButtonClick, handleBack, handleReset, handleStep }) {
  const steps = [
    { label: '날짜 확인' },
    { label: '장소 선택' },
    { label: '숙소 설정' },
    { label: '관광지' },
    { label: 'AI 추천' },
    { label: '전체 일정' }
  ];

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
          onClick={handleButtonClick}            
          fullWidth 
          className={`${styles.activeButton}`}
        >
          {activeStep === steps.length - 1 ? '저장' : '다음'}
        </Button>
      </div>
      
    </div>
  );
}

export default StepperComponent;

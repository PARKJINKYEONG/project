// CreatePlan.js

import React, { useEffect, useState } from 'react';
import { Box} from '@mui/material';
import StepperComponent from './stepperComponent';
import ContentComponent from './contentComponent';
import Header from '../header';
import { useLocation, useNavigate } from 'react-router-dom';

function CreatePlan() {
  const [activeStep, setActiveStep] = useState(0); // 현재 단계 상태 관리
  const [completed, setCompleted] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.step) {
      setActiveStep(location.state.step);  // 전달된 단계로 이동
    }
  }, [location]);//2024.08.13한동진 PlanListView에서 수정시 각 단계로 이동할때 쓰려는 훅함수

  const handleButtonClick = () => {
    if (activeStep === 5) {
      navigate('/'); // Home으로 이동
    } else {
      handleNext(); // 다음 단계로 이동
    }
  };

  // 다음 단계로 이동
  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  // 이전 단계로 이동
  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  
  //원하는 단계로 이동

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // 초기화
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  return (
    <div>
      <Header />
      <h2>계획단계</h2>
      <div style={{ display: 'flex' }}>
        {/* StepperComponent와 ContentComponent가 동일한 상태를 공유 */}
        <StepperComponent activeStep={activeStep} handleBack={handleBack} handleStep={handleStep} handleReset={handleReset} handleButtonClick = {handleButtonClick}/>
        <Box style={{ flexGrow: 1, border: '2px solid black', marginLeft: '20px'}}>
          <ContentComponent activeStep={activeStep} handleBack={handleBack} handleStep={handleStep} handleReset={handleReset} handleButtonClick = {handleButtonClick}/>
        </Box>
      </div>
    </div>
  );
}

export default CreatePlan;

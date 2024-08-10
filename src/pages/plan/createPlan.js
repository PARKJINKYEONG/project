import { Route, Routes } from "react-router-dom";
import DescriptionPlan from "./descriptionPlan";
import ProgressPlan1 from "./progressPlan1";
import ProgressPlan2 from "./progressPlan2";
import ProgressPlan3 from "./progressPlan3";
import ProgressPlan4 from "./progressPlan4";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Header from "../header";
import StepButton from '@mui/material/StepButton';
import { BorderAll } from "@mui/icons-material";




const steps = [
  {
    label: '1단계 : 계획 설명단계',
    description: `잘 만든다`,
  },
  {
    label: '2단계 : ㅇㄷ?',
    description:
      '노력한다',
  },
  {
    label: '3단계 : 뭐먹/뭐봄',
    description: `무엇을 먹고싶으세요?`,
  },
  {
    label: '4단계 : 어디서잠',
    description: `더욱더 노력한다`,
  },
  {
    label: '5단계 : 일정',
    description: `거의다왔다`,
  },
  {
    label: '6단계 : 지도에서일정',
    description: `완성`,
  },

];


export default function CreatePlan(){
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});


  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  return <>
  <Header/>
  <h2>ㄱㄱㄱㄱ </h2>
    <Box sx={{ maxWidth: 300} } style={{ border: '1px solid black' }}> {/* style border보면서 크기잡으려고, 나중에 */}
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton color="inherit" onClick={handleStep(index)}
              optional={
                index === 4 ? (
                  <Typography variant="caption">마지막 단계</Typography>
                ) : null
              }
            >
              {step.label}
            </StepButton>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? '완료' : '계속'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    뒤로가기
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            초기화
          </Button>
        </Paper>
      )}
    </Box>
  </>



};

/*
return<>
  
<Routes>
  <Route element={<DescriptionPlan/>}/>
  <Route element={<ProgressPlan1/>}/>
  <Route element={<ProgressPlan2/>}/>
  <Route element={<ProgressPlan3/>}/>
  <Route element={<ProgressPlan4/>}/>

</Routes>
</>*/

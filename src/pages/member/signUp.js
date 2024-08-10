import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, Fragment } from 'react';
import SignUpStep1 from './signUpStep1';
import SignUpStep2 from './signUpStep2';
import SignUpStep3 from './signUpStep3';
import SignUpStepEnd from './signUpStepEnd';

import { Grid } from '@mui/material';

const steps = ['필수 정보 입력', '이메일 인증', '선택 정보 입력'];
export default function SignUp(){
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [failed, setFailed] = useState(new Set());

  const isStepFailed = (step) => {
    return failed.has(step);
  };

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };


  const handleFailed = () => {
    
  }

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("필수사항은 건너뛸 수 없습니다.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return <>
          <Box sx={{ width: '100%', marginTop: '100px' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                    labelProps.optional = (
                    <Typography variant="caption">(선택 사항)</Typography>
                    );
                }
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }

                if (isStepFailed(index)) {
                  labelProps.optional = (
                    <Typography variant="caption" color="error">
                      Alert message
                    </Typography>
                  );
      
                  labelProps.error = true;
                }


                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>

            
            {activeStep === steps.length ? (// 모든 단계 종료시 출력
                

                <Fragment> 
                <SignUpStepEnd/>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>초기화</Button>
                </Box>
                </Fragment>
            ) : (
                <Fragment>

                <Grid container sx={{minHeight: '50dvh'}} spacing={2} justifyContent="center"> 
                  <Grid item xs={10} sx={{mt: '4%'}}>

                {activeStep === 0 && ( //1단계
                    <SignUpStep1 />
                )}
                
                {activeStep === 1 && ( //2단계
                    <SignUpStep2 />
                )}

                {activeStep === 2 && ( //3단계
                    <SignUpStep3 />
                )}

                </Grid>
                </Grid>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                    뒤로가기
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        건너뛰기
                    </Button>
                    )}

                    <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? '종료' : '다음'}
                    </Button>
                </Box>
                </Fragment>
            )}

            </Box>
    </>
}
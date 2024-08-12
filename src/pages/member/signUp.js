import { Fragment, useState } from "react";
import SignUpStep1 from "./signUpStep1";
import SignUpStep2 from "./signUpStep2";
import SignUpStep3 from "./signUpStep3";
import SignUpStepEnd from "./signUpStepEnd";
import { Box, Button, Grid } from "@mui/material";
import SignUpStepper from "./signUpStepper";

export default function SignUp(){
  const steps = ['필수 정보 입력', '이메일 인증', '선택 정보 입력'];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [failed, setFailed] = useState(new Set());
  const optionalSteps = new Set([2]);

  const handleFailed = () => {
    //조건 만족 안되면 여기서 작동하게
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

  const isStepFailed = (step) => {
    return failed.has(step);
  };

  const isStepOptional = (step) => {
    if(optionalSteps.has(step))
        return true;
    else
        return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  return <>

  <SignUpStepper steps={steps} activeStep={activeStep} isStepFailed={isStepFailed} isStepOptional={isStepOptional} isStepSkipped={isStepSkipped}/>
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
  </>
}
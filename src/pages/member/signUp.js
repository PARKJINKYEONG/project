import { Fragment, useState } from "react";
import SignUpStep1 from "./signUpStep1";
import SignUpStep2 from "./signUpStep2";
import SignUpStep3 from "./signUpStep3";
import SignUpStepEnd from "./signUpStepEnd";
import { Box, Button, Grid } from "@mui/material";
import SignUpStepper from "./signUpStepper";
import useRequest from '../../hooks/useRequest';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const steps = ['필수 정보 입력', '이메일 인증', '선택 정보 입력'];
  const [required, setRequired] = useState(new Set());
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [failed, setFailed] = useState(new Set());
  const optionalSteps = new Set([2]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const { post } = useRequest();

  const handleNext = async () => {
    if (required.has(activeStep)) {
      alert('모든 필수 정보를 정확히 입력해 주세요.');
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      await handleRegister();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleRegister = async () => {
    try {
      const registrationData = {
        email,
        password,
        ...userInfo,
      };
      await post('/register', registrationData, {skipAuth:true});
      alert('회원가입이 완료되었습니다.');
      navigate('/user/signin');
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
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
    setFailed(new Set()); // 초기화 시 오류도 초기화
  };

  const isStepOptional = (step) => {
    return optionalSteps.has(step);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isStepFailed = (step) => {
    return failed.has(step);
  };

  const isNextDisabled = required.has(activeStep);

  return (
    <>
      <SignUpStepper 
        steps={steps} 
        activeStep={activeStep} 
        isStepFailed={isStepFailed} 
        isStepOptional={isStepOptional} 
        isStepSkipped={isStepSkipped} 
      />
      {activeStep === steps.length ? (
        <Fragment>
          <SignUpStepEnd />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>초기화</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Grid container sx={{ minHeight: '50dvh' }} spacing={2} justifyContent="center">
            <Grid item xs={10} sx={{ mt: '4%' }}>
              {activeStep === 0 && (
                <SignUpStep1 
                  setEmail={setEmail} 
                  setPassword={setPassword} 
                  setConfirmPassword={setConfirmPassword} 
                  email={email} 
                  password={password} 
                  confirmPassword={confirmPassword} 
                  setEmailValid={setEmailValid}
                  setFailed={setFailed}
                  setRequired={setRequired}
                />
              )}
              {activeStep === 1 && <SignUpStep2 email={email} setRequired={setRequired} />}
              {activeStep === 2 && <SignUpStep3 setUserInfo={setUserInfo} />}
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
            <Button onClick={handleNext} disabled={isNextDisabled}>
              {activeStep === steps.length - 1 ? '종료' : '다음'}
            </Button>
          </Box>
        </Fragment>
      )}
    </>
  );
}

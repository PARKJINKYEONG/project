// 화면 왼쪽에 뿌려지는 단계

import React from 'react';
import { Box, Stepper, Step, StepButton, StepContent, Typography, Button, Paper } from '@mui/material';

function StepperComponent({ activeStep, handleButtonClick, handleBack, handleReset, handleStep }) {
  const steps = [
    { label: '1단계 : 계획 설명', description: '잘 만든다' },
    { label: '2단계 : ㅇㄷ?', description: '노력한다' },
    { label: '3단계 : 뭐먹/뭐봄', description: '무엇을 먹고싶으세요?' },
    { label: '4단계 : 어디서잠', description: '더욱더 노력한다' },
    { label: '5단계 : 일정', description: '거의다왔다' },
    { label: '6단계 : 지도에서일정', description: '완성' }
  ];

  return <>
    <Box sx={{ maxWidth: 350, maxHeight: '100%'}} style={{ border: '1px solid black' }}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {step.label}
            </StepButton>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mx: 2 }}>
                <div>
                  <Button onClick={handleButtonClick} variant="contained" style={{ marginRight: '8px' }}> 
                    {index === steps.length - 1 ? '확인' : '다음'}
                  </Button>
                  <Button onClick={handleBack} disabled={index === 0} variant="contained">
                    뒤로가기
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === 5 && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>일정이 생성되었습니다!</Typography>
            <Typography>일정은 언제든 수정 가능해요.</Typography>
            <Button onClick={handleReset} variant="contained" sx={{ mt: 1, mr: 1 }}>
              초기화
            </Button>
          </Paper>
        )}
    </Box>
  
  </>
}

export default StepperComponent;

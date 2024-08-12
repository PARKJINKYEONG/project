// 화면 가운데 뿌려지는 컨텐츠

import React from 'react';
import DescriptionPlan from './descriptionPlan';
import ProgressPlan1 from './progressPlan1';
import ProgressPlan2 from './progressPlan2';
import ProgressPlan3 from './progressPlan3';
import ProgressPlan4 from './progressPlan4';
import { Box, Button, Paper, Typography } from '@mui/material';
import ProgressPlan5 from './progressPlan5';


function ContentComponent({ activeStep, handleBack, handleReset, handleButtonClick }) {
  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <DescriptionPlan />;
      case 1:
        return <ProgressPlan1 />;
      case 2:
        return <ProgressPlan2 />;
      case 3:
        return <ProgressPlan3 />;
      case 4:
        return <ProgressPlan4 />;
      case 5:
        return <ProgressPlan5 />;
      default:
        return <DescriptionPlan />;
    }
  };

  return <>
    <Box>
      {renderStepComponent()}
        <Button onClick={handleButtonClick}  style={{ margin : '8px' }} variant="contained">{activeStep === 5 ? '확인' : '다음'}</Button>
        <Button onClick={handleBack} disabled={activeStep === 0} variant="contained" style={{ margin : '8px' }}>뒤로가기</Button>
    </Box>

    {activeStep === 5 && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>일정이 생성되었습니다!</Typography>
            <Typography>일정은 언제든 수정 가능해요.</Typography>
            <Button onClick={handleReset} variant="contained" sx={{ mt: 1, mr: 1 }}>
              초기화
            </Button>
          </Paper>
        )}

  </>
}

export default ContentComponent;

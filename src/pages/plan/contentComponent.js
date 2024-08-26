// 화면 가운데 뿌려지는 컨텐츠

import React from 'react';
import DescriptionPlan from './descriptionPlan';
import ProgressPlan1 from './progressPlan1';
import ProgressPlan2 from './progressPlan2';
import ProgressPlan3 from './progressPlan3';
import ProgressPlan4 from './progressPlan4';
import { Box, Button, Paper, Typography } from '@mui/material';
import ProgressPlan5 from './progressPlan5';


function ContentComponent({ activeStep, handlePlaceClick  }) {
  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <DescriptionPlan />;
      case 1:
        return <ProgressPlan1 handlePlaceClick={handlePlaceClick}/>;
      case 2:
        return <ProgressPlan2 handlePlaceClick={handlePlaceClick}/>;
      case 3:
        return <ProgressPlan3 handlePlaceClick={handlePlaceClick}/>;
      case 4:
        return <ProgressPlan4 />;
      case 5:
        return <ProgressPlan5 />;
      default:
        return <DescriptionPlan />;
    }
  };

  return <>
    <Box sx={{ marginLeft: '13px' }}>
      {renderStepComponent()}
        
    </Box>
  </>
}

export default ContentComponent;

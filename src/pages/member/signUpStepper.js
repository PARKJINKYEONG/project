import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';



export default function SignUpStepper({steps, activeStep, isStepOptional, isStepSkipped, isStepFailed}){
  


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

            </Box>
    </>
}
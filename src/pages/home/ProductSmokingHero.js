import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from './Typography';

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 13,mb:15}}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
      >
        {/* Typograhpy같은 경우도 div로 바꾸거나 수제 컴포넌트로 바꿔서 ui건드릴수있게 */}
        <Typography variant="h4" component="span" >
        Discover New Plan
        </Typography>
      </Button>
      
    </Container>
  );
}

export default ProductSmokingHero;

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};


function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'white' }}
    >
      <Container sx={{ mt: 5, mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 5, textAlign: 'left', width: '100%' }}
        >
          인기여행지
        </Typography>

        <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>

          {/* 카드 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                세계여행
              </Typography>
              <Box sx={item}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Paris, France
                </Typography>
                <Box component="img" src="/images/parieiffel.jpg" alt="world"
                  sx={{ 
                    height: 200,
                    width: 200,
                    borderRadius: '10%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.2)', 
                    },  
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* 카드 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                국내여행
              </Typography>
              <Box sx={item}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Jejudo, Korea
                </Typography>
                <Box
                  component="img"
                  src="/images/local.jpg"
                  alt="world"
                  sx={{ 
                    height: 200,
                    width: 200,
                    borderRadius: '10%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.2)', 
                    },  
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* 카드 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                문화관광부 추천
              </Typography>
              <Box sx={item}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Seoul, Korea
                  {/* 여기 div로 감싸서 min-height 똑같이 하게 하기, overflow는 ...으로해도되지않을까요 */}
                </Typography>
                <Box
                  component="img"
                  src="/images/localseoul.jpg"
                  alt="world"
                  sx={{ 
                    height: 200,
                    width: 200,
                    borderRadius: '10%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.2)', 
                    },  
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* 카드 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                추천여행지
              </Typography>
              <Box sx={item}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  London, British
                </Typography>
                <Box
                  component="img"
                  src="/images/worldlodon01.jpg"
                  alt="world"
                  sx={{ 
                    height: 200,
                    width: 200,
                    borderRadius: '10%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.2)', 
                    },  
                  }}
                />
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;

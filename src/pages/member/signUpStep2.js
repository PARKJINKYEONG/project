import { Box, Grid, TextField, Button } from "@mui/material";
import useRequest from '../../hooks/useRequest';

export default function SignUpStep2({ email }) {
  const { post } = useRequest();

  const handleSendVerification = async () => {
    try {
      await post('/sendemailvalid', { email });
      alert('인증 코드가 전송되었습니다.');
    } catch (error) {
      console.error('인증 코드 전송 중 오류 발생:', error);
    }
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            disabled
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSendVerification}>
            인증 코드 보내기
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

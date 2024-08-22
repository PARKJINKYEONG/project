import { Box, Grid, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import useRequest from '../../hooks/useRequest';

export default function SignUpStep2({ email, setRequired }) {
  const { post } = useRequest();
  const [verificationSent, setVerificationSent] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const handleSendVerification = async () => {
    try {
      const resp = await post('/checkemail', { email }, { skipAuth: true });
      console.log(resp);
      setVerificationSent(true);
      
      alert('인증 코드가 전송되었습니다.');
    } catch (error) {
      console.error('인증 코드 전송 중 오류 발생:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const resp = await post('/validemail', { email, authCode: inputCode }, { skipAuth: true });
      console.log(resp);
      if (resp.data === 'success') {
        
        setVerificationError('');
        setRequired((prev) => {
          const newRequired = new Set(prev);
          newRequired.delete(1); // 1번 스텝의 필수 체크 해제
          return newRequired;
        });
        alert('인증이 성공적으로 완료되었습니다.');
      } else {
        setVerificationError('인증 코드가 올바르지 않습니다.');
        setRequired((prev) => new Set(prev).add(1)); // 1번 스텝을 필수로 다시 추가
      }
    } catch (error) {
      console.error('인증 중 오류 발생:', error);
      setVerificationError('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (!verificationSent) {
      setRequired((prev) => new Set(prev).add(1)); // 초기에는 인증이 안 된 상태이므로 1번 스텝 필수
    }
  }, [verificationSent, setRequired]);

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
            label="이메일 주소"
            name="email"
            value={email}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSendVerification}>
            {verificationSent ? '인증 코드 재발송' : '인증 코드 보내기'}
          </Button>
        </Grid>
        {verificationSent && (
          <>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="인증 코드"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                error={!!verificationError}
                helperText={verificationError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleVerifyCode}>
                인증
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

import { Box, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import useRequest from '../../hooks/useRequest';

export default function SignUpStep1({ setEmail, setPassword, setConfirmPassword, email, password, confirmPassword, setEmailValid, setFailed, setRequired }) {
  const [emailError, setEmailError] = useState('');
  const { get } = useRequest();

  const handleEmailBlur = async () => {
    try {
      const resp = await get('/checkemail', { email }, { skipAuth: true });
      if (resp.data.exists) {
        setEmailError('이미 존재하는 이메일입니다.');
        setEmailValid(false);
        setFailed((prev) => new Set(prev).add(0));
      } else {
        setEmailError('');
        setEmailValid(true);
        setFailed((prev) => {
          const newFailed = new Set(prev);
          newFailed.delete(0);
          return newFailed;
        });
      }
    } catch (error) {
      console.error('이메일 확인 중 오류 발생:', error);
      setEmailError('서버와 통신 중 오류가 발생했습니다.');
      setEmailValid(false);
      setFailed((prev) => new Set(prev).add(0));
    }
  };

  useEffect(() => {
    const isAllFilled = email && password && confirmPassword && !emailError && password === confirmPassword;
    setRequired((prev) => {
      const newRequired = new Set(prev);
      if (isAllFilled) {
        newRequired.delete(0);
      } else {
        newRequired.add(0);
      }
      return newRequired;
    });
  }, [email, password, confirmPassword, emailError, setRequired]);

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            error={!!emailError}
            helperText={emailError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="비밀번호 확인"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={password !== confirmPassword}
            helperText={password !== confirmPassword ? "비밀번호가 일치하지 않습니다" : ""}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

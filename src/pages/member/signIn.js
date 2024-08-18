import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const { setAccessToken, setEmail } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:8080/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // 쿠키를 포함하여 요청 보냄
      });

      setAccessToken(response.headers['authorization'].split(' ')[1]);
      setEmail(loginData.email);
      navigate('/mypage');
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('아이디 혹은 비밀번호가 다릅니다');
    }
  };

  return <>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
          }}
        >
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="자동 로그인"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            
            <Grid container sx={{ justifyContent: 'space-between' }}>
              <Grid item>
                <Link href="findpw" variant="body2" sx={{ color: "black", textDecoration: 'none' }}>
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2" sx={{ color: "black", textDecoration: 'none' }}>
                  회원가입
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'center', my: 5 }}>
              <Box sx={{ flex: 1, height: '1px', backgroundColor: 'gray' }} />
              <Typography
                variant="h6"
                sx={{
                  px: 2,
                }}
              >
                소셜로그인
              </Typography>
              <Box sx={{ flex: 1, height: '1px', backgroundColor: 'gray' }} />
            </Box>
            <Grid container sx={{ justifyContent: 'center', textAlign: 'center' }} spacing={1}>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundImage: 'url(/images/login/naver_login.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '50px',
                    width: '220px',
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                    padding: 0,
                    minWidth: 'auto',
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundImage: 'url(/images/login/kakao_login_large_narrow.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '50px',
                    width: '220px',
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                    padding: 0,
                    minWidth: 'auto',
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundImage: 'url(/images/login/web_dark_sq_SI@4x.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '50px',
                    width: '220px',
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                    padding: 0,
                    minWidth: 'auto',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
}

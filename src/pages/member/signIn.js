import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/userContext';
import useRequest from '../../hooks/useRequest';
import { GOOGLE, KAKAO, NAVER } from '../../config/constraint';

const defaultTheme = createTheme();

export default function SignIn() {
  const KAKAO_REST_API_KEY = KAKAO.API_KEY;
  const KAKAO_REDIRECT_URI = KAKAO.REDIRECT_URI;
  const GOOGLE_CLIENT_ID = GOOGLE.CLIENT_ID;
  const GOOGLE_REDIRECT_URI = GOOGLE.REDIRECT_URI;
  const NAVER_CLIENT_ID = NAVER.CLIENT_ID;
  const NAVER_REDIRECT_URI = NAVER.REDIRECT_URI;
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken, setEmail, setIsAdmin } = useContext(UserContext);
  const {post} = useRequest();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const access = searchParams.get('access');
    const isAdmin = searchParams.get('isAdmin');
    const email = searchParams.get('email');

    if (access) setAccessToken(access);
    if (isAdmin) setIsAdmin(isAdmin === 'true');
    if (email) setEmail(email);
    
    if (access && isAdmin && email) {
      navigate('/mypage');
    }
  }, [location, setAccessToken, setIsAdmin]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      const resp = await post('/login', loginData, {
        skipAuth: true
    });
    console.log(resp);
    console.log(resp.headers);
    setAccessToken(resp.headers['authorization'].split(' ')[1]);
    setEmail(resp.data.username);
    setIsAdmin(resp.data.isAdmin);
    navigate('/mypage');
  } catch (error) {
    console.error('로그인 요청 중 오류 발생:', error);
    alert('아이디 혹은 비밀번호가 다릅니다');
  }
  };

  const handleKakao = () => {
    window.location.href =`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
};

const handleGoogle = () => {
  window.location.href =`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email`;
};

const handleNaver = () => {  // 네이버 로그인 핸들러 추가
  window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=RANDOM_STATE_STRING`;
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
                  onClick={handleNaver}
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
                  onClick={handleKakao}
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
                  onClick={handleGoogle}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
}

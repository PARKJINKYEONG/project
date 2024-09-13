import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import useRequest from '../../hooks/useRequest';
import { GOOGLE, KAKAO, NAVER } from '../../config/constraint';
import { Alert, Collapse, IconButton } from '@mui/material';
import kakaoIcon from '../../assets/login/circleimg/kakao.png';
import naverIcon from '../../assets/login/circleimg/btnG_아이콘원형.png';
import googleIcon from '../../assets/login/circleimg/web_light_rd_na@4x.png';


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
  const { post } = useRequest();

  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const access = searchParams.get('access');
    const isAdmin = searchParams.get('isAdmin');
    const email = searchParams.get('email');
    
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    setStatus(status);
    setMessage(message);

    if (message) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    if (access) setAccessToken(access);
    if (isAdmin) setIsAdmin(isAdmin === 'true');
    if (email) setEmail(email);
    
    if (access && isAdmin && email) {
      navigate('/mypage');
    }
  }, [location, setAccessToken, setIsAdmin, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      const resp = await post('/login', loginData, {
        skipAuth: true,
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
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  };

  const handleGoogle = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email`;
  };

  const handleNaver = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=RANDOM_STATE_STRING`;
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm"> {/* maxWidth를 'sm'로 설정하여 가로 길이를 늘림 */}
          <Box
            sx={{
              marginTop: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh',
            }}
          >
            <Collapse in={open}>
              <Alert
                color={status}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {message}
              </Alert>
            </Collapse>
            <Typography component="h1" variant="h5">

              로그인
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}> {/* width를 100%로 설정 */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ maxWidth: '100%' }} 
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
                sx={{ maxWidth: '100%' }} 
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
              <Grid container sx={{ justifyContent: 'space-around', textAlign: 'center', mb: 8 }} spacing={2}>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundImage: `url(${naverIcon})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '60px',
                      width: '60px',
                      borderRadius: '30px',
                      backgroundColor: 'transparent',
                      '&:hover': { backgroundColor: 'transparent' },
                      padding: 0,
                      minWidth: 'auto',
                      margin: '0 10px',
                    }}
                    onClick={handleNaver}
                  />
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundImage: `url(${kakaoIcon})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '60px',
                      width: '60px',
                      borderRadius: '30px',
                      backgroundColor: 'transparent',
                      '&:hover': { backgroundColor: 'transparent' },
                      padding: 0,
                      minWidth: 'auto',
                      margin: '0 10px',
                    }}
                    onClick={handleKakao}
                  />
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundImage: `url(${googleIcon})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '60px',
                      width: '60px',
                      borderRadius: '30px',
                      backgroundColor: 'transparent',
                      '&:hover': { backgroundColor: 'transparent' },
                      padding: 0,
                      minWidth: 'auto',
                      margin: '0 10px',
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
  );
}

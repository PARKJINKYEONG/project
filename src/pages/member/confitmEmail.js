import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ConfirmEmail = ({setEmailCheck}) => {
    const [isSend, setIsSend] = useState(false);
    const handleSendEmail = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(!isSend)
            setIsSend(true);
        //setEmailCheck(true)
      };

    const handleConfirmEmail = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmailCheck(true);
    };
    
    return <>
    
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh'
        }}
      >
        <Typography component="h1" variant="h5">
          비밀번호 찾기
        </Typography>
        <Typography variant="h7">
          가입했던 이메일로 인증 코드를 보내드립니다.
        </Typography>
        
        <Box component="form" onSubmit={handleSendEmail} noValidate sx={{ mt: 1 }}>
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
          {!isSend &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            발송
          </Button>}
        {isSend &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            재발송
          </Button>
        }
        </Box>
        {isSend &&
        <Box component="form" onSubmit={handleConfirmEmail} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmNum"
            label="인증번호"
            name="confirmNum"
            autoFocus
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            확인
          </Button>
        </Box>
    }
      </Box>
      
  </>
};

export default ConfirmEmail;
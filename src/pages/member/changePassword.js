import { Box, Button, TextField, Typography } from "@mui/material";

const ChangePassword = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
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
          비밀번호 변경
        </Typography>
        <Typography variant="h7">
          새로운 비밀번호를 입력해주세요
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="새로운 비밀번호"
            name="password"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="passwordConfirm"
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            변경
          </Button>
          
          
        </Box>
      </Box>
  </>
};

export default ChangePassword;
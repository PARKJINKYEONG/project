
import { Box, Grid, TextField } from "@mui/material";

export default function SignUpStep2(){

return <>
    <Box component="form" noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                disabled
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="이메일 인증번호"
                id="password"
                autoComplete="current-password"
                />
            </Grid>
        </Grid>
    </Box>

</>
}
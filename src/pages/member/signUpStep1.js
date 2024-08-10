
import { Box,  TextField } from "@mui/material";

export default function SignUpStep1(){

return <>
    <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordconfirm"
              label="PasswordConfirm"
              type="password"
              id="passwordconfirm"
              autoComplete="current-password"
            />
          </Box>

</>
}
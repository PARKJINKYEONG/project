
import { Box,  Grid,  InputLabel,  TextField } from "@mui/material";
import { useState } from "react";
import PhoneInput from "../../components/phoneInput";
import InputField from "../../components/inputField";
import AddressSearch from "../../components/addressSearch";

export default function SignUpStep3(){
const [name, setName] = useState('');
const [phone, setPhone] = useState({ part1: '', part2: '', part3: '' });
const [address, setAddress] = useState('');
const [zonecode, setZonecode] = useState('');
const [extraAddress, setExtraAddress] = useState('');
const handleAddressSelect = (data) => {
  setAddress(data.fullAddress);
  setZonecode(data.zonecode);
  setExtraAddress(data.extraAddress);
};
return <>
    <Box component="form" noValidate sx={{ mt: 3 }}>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <InputLabel shrink='true'>이름</InputLabel>
              <InputField value={name} onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
              <InputLabel shrink='true'>전화번호</InputLabel>
              <PhoneInput phone={phone} setPhone={setPhone} />
              </Grid>
              <Grid item xs={12}>
              <InputLabel shrink='true'>주소</InputLabel>
              <InputField value={address} readOnly />
              </Grid>
              <Grid item xs={12}>
              <AddressSearch onAddressSelect={handleAddressSelect} />
              </Grid>
              <Grid item xs={12}>
              <InputLabel shrink='true'>우편번호</InputLabel>
              <InputField value={zonecode} readOnly />
              </Grid>
              {extraAddress && (
                <Grid item xs={12}>
                <InputLabel shrink='true'>추가 주소</InputLabel>
                <InputField value={extraAddress} onChange={(e) => setExtraAddress(e.target.value)} />
                </Grid>
              )}
              
            </Grid>
          </Box>

</>
}
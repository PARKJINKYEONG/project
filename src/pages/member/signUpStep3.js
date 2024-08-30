import { Box, FormControlLabel, Grid, InputLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import PhoneInput from "../../components/phoneInput";
import InputField from "../../components/inputField";
import AddressSearch from "../../components/addressSearch";

export default function SignUpStep3({ setUserInfo }) {
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState({ part1: '', part2: '', part3: '' });
  const [address, setAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [extraAddress, setExtraAddress] = useState('');

  const handleGenderChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setGender(value);
  };

  const handleAddressSelect = (data) => {
    setAddress(data.fullAddress);
    setZonecode(data.zonecode);
    setExtraAddress(data.extraAddress);
  };

  const handleSaveInfo = () => {
    setUserInfo({
      name,
      nickname,
      gender: gender === 'male' ? true : gender === 'female' ? false : null,
      phone: `${phone.part1}-${phone.part2}-${phone.part3}`,
      address,
      zonecode,
      extraAddress,
    });
  };

  return (
    <Box component="form" noValidate sx={{ mt: 3 }} onBlur={handleSaveInfo}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel shrink>이름</InputLabel>
          <InputField value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <InputLabel shrink>닉네임</InputLabel>
          <InputField value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <InputLabel shrink>성별</InputLabel>
        <RadioGroup defaultValue="null"
    name="gender"
    row
    value={gender}
    onChange={handleGenderChange}>
        <FormControlLabel control={<Radio />} value="남자" label="남자"/> 
        <FormControlLabel control={<Radio />} value="여자" label="여자"/>
        </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <InputLabel shrink>주소</InputLabel>
          <InputField value={address} readOnly />
        </Grid>
        <Grid item xs={12}>
          <AddressSearch onAddressSelect={handleAddressSelect} />
        </Grid>
        <Grid item xs={12}>
          <InputLabel shrink>우편번호</InputLabel>
          <InputField value={zonecode} readOnly />
        </Grid>
        {extraAddress && (
          <Grid item xs={12}>
            <InputLabel shrink>추가 주소</InputLabel>
            <InputField value={extraAddress} onChange={(e) => setExtraAddress(e.target.value)} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

import { Button } from "@mui/base";
import { Box, Grid, InputLabel } from "@mui/material";
import InputField from "../components/inputField";
import useRequest from "../hooks/useRequest";
import { useState } from "react";

export function RouteMap(){
    
    const {get, post, put, del} = useRequest();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getDataTest1 = async () => {
      try {
        const data = await get('/api/get1'); 
        console.log(data);
      } catch (error) {
        console.error('GET 요청 중 오류 발생:', error);
      }
    };
    const getDataTest2 = async () => {
      try {
        const data = await get('/api/get2/'+ email); 
        console.log(data);
      } catch (error) {
        console.error('GET 요청 중 오류 발생:', error);
      }
    };
  
    const getDataTest3 = async () => {
      try {
        const data = await get('/api/get3', {'email':email}); 
        console.log(data);
      } catch (error) {
        console.error('GET 요청 중 오류 발생:', error);
      }
    };

    const postDataTest = async () => {
      try {
        const data = await post('/register', {'email': email, 'password':password});
        console.log('응답 데이터:', data);
      } catch (error) {
        console.error('POST 요청 중 오류 발생:', error);
      }
    };

    return <>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <InputLabel shrink='true'>이메일</InputLabel>
          <InputField value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
          <InputLabel shrink='true'>비밀번호</InputLabel>
          <InputField value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
        </Grid>
        
        <Button onClick={postDataTest}>회원가입POST</Button>
        <Button onClick={getDataTest1} >GET1</Button>
        <Button onClick={getDataTest2} >GET2</Button>
        <Button onClick={getDataTest3} >GET3</Button>
      </Box>
    </>
}
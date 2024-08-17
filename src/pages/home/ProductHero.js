import * as React from 'react';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { styled } from '@mui/material/styles';


export default function ProductHero() {
  return (
    //헤더랑 간격 좀 띄워주세요
    <ProductHeroLayout
      sxBackground={{
        backgroundColor: '#4169E1', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* 폰트색깔 골라서 해주세요 */}
      <Typography color="inherit" align="center" variant="h2" marked="center">
      <span style={{color:'#071952'}}>Personalized</span> <span style={{ color:'#EBF4F6'}}>travel</span> <span style={{ color:'#37B7C3'}}>planner</span>
      </Typography>
      <Typography
        color="black"
        align="center"
        variant="h5"
        sx={{ mb: 3, mt: { xs: 5, sm: 8 } }}
        zindex="1"
      >
        Personalized travel planner using conversational AI.
      </Typography>
      {/* 위쪽 폰트랑 맞춰주기(골라서) */}
      <span style={{ color:'#EBF4F6' }}>Travel Joy</span>   
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        
        
      </Typography>
      
    </ProductHeroLayout>
  );
}

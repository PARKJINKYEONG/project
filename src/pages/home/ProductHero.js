import * as React from 'react';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundColor: '#4169E1', // 배경 이미지의 평균 색상
        backgroundPosition: 'center',
      }}
      sx={{ marginTop: '100px' }} // 상단에 간격 추가
    >
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        sx={{ marginTop: '30px' }} // 타이틀 이미지와 다른 요소 사이의 간격 조정
      >
        <span style={{ color: '#002f80' }}>Personalized</span>{' '}
        <span style={{ color: '#4169E1' }}>travel</span>{' '}
        <span style={{ color: '#ccdfff' }}>planner</span>
      </Typography>
      
      {/* 음영 배경이 포함된 텍스트 영역 */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // 검은색 배경에 50% 투명도
          padding: '20px',
          marginTop: '20px',
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        <Typography
          color="white"
          align="center"
          variant="h5"
          sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} // 텍스트에 음영 추가
          zindex="1"
        >
          여행을 준비하는 당신의 시간 Travel Joy AI PLANNER가 <br /> 절약해드립니다.
        </Typography>
      </div>

      <span style={{ color: 'white', marginTop: '20px', display: 'block' }}>Travel Joy</span>
      <Typography variant="body2" color="inherit" sx={{ mt: 4 }}></Typography>
    </ProductHeroLayout>
  );
}

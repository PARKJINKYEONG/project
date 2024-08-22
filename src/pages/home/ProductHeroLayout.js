import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProductHeroLayoutRoot = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '60vh',
    minHeight: 500,
    maxHeight: 800,
  },
}));

const Background = styled('div')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
});

function ProductHeroLayout(props) {
  const { children } = props;

  // 이미지 배열을 정의합니다.
  const images = [
    '/images/title-img01.jpg',
    '/images/title-img02.jpg',
    '/images/title-img03.jpg',
    // 추가 이미지 경로를 여기에 추가
  ];

  // 현재 이미지 인덱스를 관리하는 상태
  const [currentImage, setCurrentImage] = React.useState(0);

  // 몇 초마다 이미지를 변경하는 useEffect
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // 3초마다 이미지 변경

    // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
         <Typography
          variant="h4" // 텍스트 크기를 설정합니다. 필요에 따라 변경 가능
          align="center"
          color="inherit"
          sx={{ marginBottom: '20px'}} // 텍스트와 다른 요소 간의 간격 조정
        >
          Travel Joy
        </Typography>

        {children}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.1,
            zIndex: 2,
          }}
        />
        <Background />
        <Box
          component="img"
          src={images[currentImage]}
          
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
      </Container>
    </ProductHeroLayoutRoot>
  );
}

ProductHeroLayout.propTypes = {
  children: PropTypes.node,
};

export default ProductHeroLayout;

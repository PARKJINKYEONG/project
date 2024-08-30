import React, { useEffect, useState } from 'react';

import QnAstyle from '../../styles/userQna.module.css';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';
import TextField_ from '../../components/textField';


function QnaView() {

    const location = useLocation();
    //initialTitle이나 initialContent가 존재하지 않으면 각각 기본값으로 빈문자열 설정
    const { initialTitle = '', initialContent = '' } = location.state || {};
  
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const navigate = useNavigate();
  
    useEffect(() => {
      setTitle(initialTitle);
      setContent(initialContent);
    }, [initialTitle, initialContent]);
  
    const handleSubmit = () => {
      if (!title) {
        alert('제목을 입력하세요');
        return;
      }
      if (!content) {
        alert('내용을 입력하세요');
        return;
      }
      console.log('문의 제출:', { title, content });
      alert('문의가 제출되었습니다.');
      navigate('/changeInfo/reportAndInqueiryList');
    };
  
    const handleCancel = () => {
      navigate(-1); // 이전 페이지로 돌아가기
    };
  
  return <>
        <Box 
            sx={{ 
                textAlign: 'center', 
                mb: 2, 
                p: 2, 
                backgroundImage: 'url(/images/QnA.webp)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center 50%', 
                height: 200
            }}
        >
        </Box>
        <Paper elevation={3} style={{ padding: '20px', margin: '35px 20px ' }}>
      <Typography variant="h4" gutterBottom>
        Q&A작성
      </Typography>
      <form noValidate autoComplete="off">
        <TextField_
          label="문의 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField_
          label="문의 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline={true}
          rows={6} 
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="contained" sx={{ backgroundColor: 'blue', color: 'white', width:'100px'}} onClick={handleSubmit} style={{ marginRight: '10px' }}>
            작성하기
          </Button>
          <Button variant="outlined" sx={{ backgroundColor: 'red', color: 'white', width:'100px' }} onClick={handleCancel}>
            취소
          </Button>
        </div>
      </form>
    </Paper>
  </>
};

export default QnaView;

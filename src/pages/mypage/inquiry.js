import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField_ from '../../components/textField';

export default function Inquiry() {
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

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '200px 20px ' }}>
      <Typography variant="h4" gutterBottom>
        문의 작성
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
          <Button variant="contained" sx={{ backgroundColor: 'blue', color: 'white' }} onClick={handleSubmit} style={{ marginRight: '10px' }}>
            제출
          </Button>
          <Button variant="outlined" sx={{ backgroundColor: 'red', color: 'white' }} onClick={handleCancel}>
            취소
          </Button>
        </div>
      </form>
    </Paper>
  );
}

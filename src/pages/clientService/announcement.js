import React, { useState } from 'react';

import QnAstyle from '../../styles/userQna.module.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const testData = [
  {   id:'1',
      title:'공지사항1',
      author:'석석이',
      createdAt:'2024-08-15',
      content:'첫번째 공지사항입니다'
  },
  {   id:'2',
      title:'공지사항2',
      author:'석석이',
      createdAt:'2024-08-15',
      content:'두번째 공지사항입니다'
  },
  {   id:'3',
    title:'공지사항33333',
    author:'석석이',
    createdAt:'2024-08-15',
    content:'세번째 공지사항입니다'
},
];

function Announcement() {

  const navigate = useNavigate(); // useNavigate 훅 사용

    const handleFAQClick = () => {
        navigate('/userFaq'); // FAQ 페이지로 이동
    };
    
    
    const [qnaList, setQnaList] = useState(testData);

    const handleOnclickTitle = (qna) => {
      navigate('/announcement/'+qna.id, {state: qna});
    };
    const handleQNAClick = () => {
        navigate('/userQna'); // QnA 페이지로 이동
    };
    const handleFaqClick = () => {
        navigate('/userFaq'); // eCrm 페이지로 이동
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "90px",
      };
    
    const headerStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
      };
  
    const headerMenuStyle = {
        fontSize: "16px",
        marginBottom: "15px",
      };

    const tabStyle = {
        display: "inline-block",
        marginRight: "15px",
        cursor: "pointer",
        fontWeight: "bold",
      };

    const thStyle = {
        borderBottom: "2px solid black",
        textAlign: "left",
        padding: "8px",
      };

    

  return <>
    <div className="qna-container">
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
            <div style={{ padding: "20px" }}>
                <div style={headerStyle}>공지사항</div>
                    <div style={headerMenuStyle}>
                        <span style={tabStyle}>NOTICE</span>
                        <span style={tabStyle} onClick={handleQNAClick}>| Q&A</span>
                        <span style={tabStyle} onClick={handleFAQClick}>| FAQ</span>
                    </div>
                <div style={{ margin: '20px 0' }}>

                <table style={tableStyle}>
                    <thead>
                        <th style={thStyle}>No</th>
                        <th style={thStyle}>제목</th>
                        <th style={thStyle}>작성자</th>
                        <th style={thStyle}>작성시간</th>
                    </thead>
                    <tbody>
                        {qnaList.map((qna) => (
                        <tr key={qna.id}>
                            <td>{qna.id}</td>
                            <td onClick={()=>{handleOnclickTitle(qna);}} style={{cursor: 'pointer'}}>{qna.title}</td>
                            <td>{qna.author}</td>
                            <td>{qna.createdAt}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
    </div>
  </>
};

export default Announcement;

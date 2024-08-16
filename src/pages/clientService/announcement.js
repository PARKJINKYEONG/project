import React, { useState } from 'react';

import QnAstyle from '../../styles/userQna.module.css';

import { NavLink, useNavigate } from 'react-router-dom';

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
    const handleeCrmClick = () => {
        navigate('/eCrm'); // eCrm 페이지로 이동
    }
    
    const [qnaList, setQnaList] = useState(testData);

    const handleOnclickTitle = (qna) => {
      navigate('/announcement/'+qna.id, {state: qna});
    };
  return <>
    <div className="qna-container">
                <div className={`text-center ${QnAstyle.headerImage}`}>
                    <img src="/images/Mask_group.png" alt="Header" className="header-image" />
                </div>
                <div className="menu" style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <input type="text" placeholder="검색"style={{ width: '800px', height:'45px' }} />
                        <button>검색</button>
                    </div>
                </div>
                <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>   
                    <h2>공지사항 </h2>
                </div> 
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
                <thead style={{border: '1px solid'}}>
                    <tr>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성시간</th>
                    </tr>
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
  </>
};

export default Announcement;

// src/components/QnA.js

import React from 'react';
import './userQna.css';

const QnA = () => {
    return <>
      
        <div className="qna-container">
             <div className="header">
              <img src="/images/Mask_group.png" alt="Header" className="header-image" />
            </div>
            <div className="menu">
                <button>전체</button>
                <button>공지사항</button>
                <button>고객센터</button>
                <input type="text" placeholder="검색" />
                <button>검색</button>
            </div>
            <div className="qna-section">
                <h2>Q&A</h2>
                <table>
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 데이터가 여기에 추가됩니다 */}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default QnA;

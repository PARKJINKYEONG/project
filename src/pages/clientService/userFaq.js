import React, { useState } from 'react';
import QnAstyle from '../../styles/userFaq.module.css'; // CSS 파일을 불러옵니다

const UserFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="header">
        <img src="/images/Mask_group.png" alt="Header" className="header-image" />
      </div>
      <div className="nav">
        <button>전체</button>
        <button>공지사항</button>
        <button>고객센터</button>
      </div>
      <div className="faq">
        <h2>FAQ</h2>
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(0)}>
            다음 단계로 넘어가지 않나요?
          </div>
          {activeIndex === 0 && (
            <div className="faq-answer">
              여기서 다음 단계로 넘어가지 않는 문제에 대한 설명을 추가하세요.
            </div>
          )}
        </div>
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(1)}>
            로그인이 되지 않는다면?
          </div>
          {activeIndex === 1 && (
            <div className="faq-answer">
              여기서 로그인이 되지 않는 문제에 대한 설명을 추가하세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFaq;

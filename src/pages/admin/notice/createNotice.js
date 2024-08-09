// CreateNotice.js
import React from 'react';

const CreateNotice = ({ setIsCreating }) => {

  const handleCreate = () => {
    // 공지 생성 로직을 여기에 추가합니다.
    setIsCreating(false); // 공지 생성이 완료되면 다시 목록 화면으로 돌아갑니다.
  };

  return (
    <div>
      <h2>공지 사항 추가</h2>
      {/* 공지 추가를 위한 폼 요소 등을 여기에 추가 */}
      <button onClick={handleCreate}>공지 생성</button>
      <button onClick={() => setIsCreating(false)}>취소</button>
    </div>
  );
};

export default CreateNotice;
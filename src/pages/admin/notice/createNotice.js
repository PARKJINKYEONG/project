import React from 'react';

const CreateNotice = ({ setIsCreating }) => {

  const handleCreate = () => {
    setIsCreating(false);
  };

  return (
    <div>
      <h2>공지 사항 추가</h2>
      <form>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력하세요"
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            name="content"
            placeholder="내용을 입력하세요"
            rows="5"
            required
            style={{ width: '100%', marginBottom: '10px' }}
          ></textarea>
        </div>
      <button onClick={handleCreate} style={{ marginRight: '10px' }} variant="contained">공지 생성</button>
      <button onClick={() => setIsCreating(false)} variant="contained">취소</button>
      </form>
    </div>  
  );
};

export default CreateNotice;
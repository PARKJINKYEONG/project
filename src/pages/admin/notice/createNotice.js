import axios from 'axios';
import React, { useState } from 'react';

const CreateNotice = ({ setIsCreating, fetchNotices  }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/notice', { title, content }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchNotices(); // 공지사항 목록을 다시 불러옵니다.
      setIsCreating(false); // 공지사항 생성 화면에서 나옵니다.
    } catch (error) {
      console.error('공지사항을 생성하는 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <div>
      <h2>공지 사항 추가</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '600px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label><br/>
          <textarea
            id="content"
            name="content"
            value={content}
            placeholder="내용을 입력하세요"
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            required
            style={{ width: '600px', marginBottom: '10px', height: '400px' }}
          ></textarea>
        </div>
        <div>
          <button 
            type="submit" 
            style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff', backgroundColor: '#3f51b5', width: '70px', marginRight: '5px' }} 
          >
            생성
          </button>
          <button 
            type="button" 
            onClick={() => setIsCreating(false)} 
            style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff', backgroundColor: '#f44336', width: '70px' }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotice;
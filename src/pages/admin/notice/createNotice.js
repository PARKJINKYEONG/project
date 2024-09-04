import axios from 'axios';
import React, { useState } from 'react';
import styles from '../../../styles/admin/notice/createNotice.module.css'; // 새로운 스타일 모듈

const CreateNotice = ({ setIsCreating, fetchNotices, navigate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState(''); // 작성자 상태 추가

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/notice', { title, content, writer }, { // 작성자 추가
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetchNotices(); // 공지사항 목록을 다시 불러옵니다.
      navigate('/admin2/notice'); // 목록 페이지로 이동합니다.
    } catch (error) {
      console.error('공지사항을 생성하는 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>공지사항 추가</h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleCreate}>
          <div className={styles.formGroup}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="제목을 입력하세요"
              onChange={(e) => setTitle(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="writer">작성자:</label>
            <input
              type="text"
              id="writer"
              name="writer"
              value={writer}
              placeholder="작성자를 입력하세요"
              onChange={(e) => setWriter(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="content">내용:</label>
            <textarea
              id="content"
              name="content"
              value={content}
              placeholder="내용을 입력하세요"
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              required
              className={styles.textarea}
            ></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button 
              type="submit" 
              className={styles.createButton}
            >
              생성
            </button>
            <button 
              type="button" 
              onClick={() => setIsCreating(false)} 
              className={styles.cancelButton}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotice;

import React, { useState } from 'react';
import useRequest from '../../../hooks/useRequest'; // useRequest 훅 import
import styles from '../../../styles/admin/notice/editNotice.module.css'; // 새로운 스타일 모듈

const EditNotice = ({ notice, setIsEditing, fetchNotices }) => {
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);

  // useRequest 훅에서 put과 del 메서드 가져오기
  const { put, del } = useRequest();

  const handleSave = async () => {
    try {
      await put(`http://localhost:8080/api/notice/${notice.id}`, { title, content });
      await fetchNotices(); // 공지사항 목록을 다시 불러옵니다.
      setIsEditing(false); // 수정 화면에서 나옵니다.
    } catch (error) {
      console.error('공지사항을 수정하는 중 오류가 발생했습니다.', error);
      alert('공지사항을 수정하는 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await del(`http://localhost:8080/api/notice/${notice.id}`);
      await fetchNotices(); // 공지사항 목록을 다시 불러옵니다.
      setIsEditing(false); // 수정 화면에서 나옵니다.
    } catch (error) {
      console.error('공지사항을 삭제하는 중 오류가 발생했습니다.', error);
      alert('공지사항 삭제 권한이 없습니다.'); // 삭제 권한이 없다는 메시지 표시
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>공지사항 수정</h2>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.formGroup}>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>내용:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              className={styles.textarea}
            ></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleSave}
              className={styles.saveButton}
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              삭제
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={styles.backButton}
            >
              뒤로
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotice;

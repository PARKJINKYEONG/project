import React from 'react';
import styles from '../../../styles/admin/notice/noticeView.module.css'; // 공지사항 상세보기 스타일

const NoticeView = ({ notice, setSelectedNotice }) => {
  return (
    <div className={styles.noticeViewContainer}>
      <button onClick={() => setSelectedNotice(null)} className={styles.backButton}>목록으로</button>
      <h2 className={styles.noticeTitle}>{notice.title}</h2>
      <p className={styles.noticeDate}>{new Date(notice.noticeDate).toLocaleDateString()}</p>
      <div className={styles.noticeContent}>
        {notice.content}
      </div>
    </div>
  );
};

export default NoticeView;

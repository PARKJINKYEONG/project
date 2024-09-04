import React from 'react';
import styles from '../../../styles/admin/notice/noticeTable.module.css'; // 공지사항 테이블 스타일

const NoticeTable = ({ notices, onNoticeClick, onAddClick }) => {
  return (
    <div className={styles.inquiryContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>공지사항</h2>
        <button className={styles.addButton} onClick={onAddClick}>공지 추가</button>
      </div>
      <table className={styles.inquiryTable}>
        <thead>
          <tr>
            <th className='col-1'>번호</th>
            <th className='col-3'>공지 제목</th>
            <th className='col-2'>공지 일자</th>
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <tr key={notice.id} onClick={() => onNoticeClick(notice)} className={styles.clickableCell}>
                <td className="col-1 text-center">{index + 1}</td>
                <td className="col-3 text-center">{notice.title}</td>
                <td className="col-2 text-center">{new Date(notice.noticeDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className={`text-center ${styles.noData}`}>
                새로 등록된 공지사항이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeTable;

import React, { useState } from 'react';
import styles from '../../../styles/noticeManagement.module.css';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CreateNotice from './createNotice';
import EditNotice from './editNotice';

const initialNotices = [
  { id: 1, date: '2024-08-01', title: '공지사항 1', content: '공지 내용 1' },
  { id: 2, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 3, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 4, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 5, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 6, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 7, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 8, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 9, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 10, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 11, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 12, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 13, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 14, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 15, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 16, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 17, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 18, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 19, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 20, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 21, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' },
  { id: 22, date: '2024-08-02', title: '공지사항 2', content: '공지 내용 2' }
];

const NoticeManagement  = () => {

  const [notices, setNotices] = useState(initialNotices);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);

  const handleNoticeClick = (notice) => {
    setCurrentNotice(notice);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setIsCreating(true);
  };


  return (
    <div className={styles.container}>
      {!isCreating && !isEditing ? (
        <>
        <h2>공지사항</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.idColumn}>번호</TableCell>
                  <TableCell className={styles.titleColumn}>공지 제목</TableCell>
                  <TableCell className={styles.dateColumn}>공지 일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notices.map((notice) => (
                  <TableRow key={notice.id} className={styles.tableRow}>
                    <TableCell>{notice.id}</TableCell>
                    <TableCell onClick={() => handleNoticeClick(notice)} className={styles.clickableCell}>
                      {notice.title}
                    </TableCell>
                    <TableCell className={styles.dateColumn}>{notice.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" sx={{ marginTop: '10px'}} onClick={handleAddClick}>공지 추가</Button>
        </>
      ) : isCreating ? (
        <CreateNotice setIsCreating={setIsCreating}/>
      ) : (
        <EditNotice notice={currentNotice} setIsEditing={setIsEditing} />
      )}
    </div>
  );

};

export default NoticeManagement;
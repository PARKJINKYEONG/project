import React, { useEffect, useState } from 'react';
import styles from '../../../styles/noticeManagement.module.css';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CreateNotice from './createNotice';
import EditNotice from './editNotice';
import axios from 'axios';
import useRequest from '../../../hooks/useRequest';

const NoticeManagement  = () => {
  const [notices, setNotices] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const { get } = useRequest(); 

  const fetchNotices = async () => {
    try {
      const response =await get(`http://localhost:8080/notice/all`);
      setNotices(response.data);
    } catch (error) {
      console.error('공지사항을 불러오는 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

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
          <TableContainer TableContainer sx={{ width: '100%' }} className={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.idColumn}>번호</TableCell>
                  <TableCell className={styles.titleColumn}>공지 제목</TableCell>
                  <TableCell className={styles.dateColumn}>공지 일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {notices.length > 0 ? (
                  notices.map((notice) => (
                    <TableRow
                      key={notice.id}
                      onClick={() => handleNoticeClick(notice)}
                      className={`${styles.tableRow} ${styles.clickableRow}`}
                      hover
                    >
                      <TableCell>{notice.id}</TableCell>
                      <TableCell>{notice.title}</TableCell>
                      <TableCell className={styles.dateColumn}>{notice.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      공지사항이 없습니다
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" sx={{ marginTop: '10px'}} onClick={handleAddClick}>공지 추가</Button>
        </>
      ) : isCreating ? (
        <CreateNotice setIsCreating={setIsCreating} fetchNotices={fetchNotices}/>
      ) : (
        <EditNotice notice={currentNotice} setIsEditing={setIsEditing} fetchNotices={fetchNotices}/>
      )}
    </div>
  );
};

export default NoticeManagement;
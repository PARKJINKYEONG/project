import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/admin/notice/noticeManagement.module.css';
import axios from 'axios';
import NoticeTable from './noticeTable';
import CreateNotice from './createNotice';
import EditNotice from './editNotice';

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 전환

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/notice/all');
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
        <NoticeTable notices={notices} onNoticeClick={handleNoticeClick} onAddClick={handleAddClick} />
      ) : isCreating ? (
        <CreateNotice setIsCreating={setIsCreating} fetchNotices={fetchNotices} navigate={navigate} />
      ) : (
        <EditNotice notice={currentNotice} setIsEditing={setIsEditing} fetchNotices={fetchNotices} />
      )}
    </div>
  );
};

export default NoticeManagement;

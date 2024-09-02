import React, { useContext, useEffect, useReducer, useState } from 'react';
import styles from '../../../styles/admin/chatManagement.module.css';
import SideMemoBar from './sideMemoBar';
import axios from 'axios';
import ChatWindow from './chatWindow';
import useRequest from '../../../hooks/useRequest';
import { UserContext } from '../../../contexts/userContext';

const initialState = { isOpen: false };

const sideMemoReducer = (state, action) => {
    switch (action.type) {
        case 'open':
            return { isOpen: true };
        case 'close':
            return { isOpen: false };
        case 'toggle':
            return { isOpen: !state.isOpen };
        default:
            return state;
    }
};

const ChatManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSideMemoOpen, dispatch] = useReducer(sideMemoReducer, initialState);
    const [useritems, setUserItems] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { get } = useRequest();


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSideMemoBar = () => {
        dispatch({ type: 'toggle' });
    };

    const fetchUsers = async () => {
        // console.log(email);
        try{
          const response = await get('/api/chat/users');
          console.log(response.data);
          setUserItems(response.data);
              
        } catch(err) {
          console.log('사용자 채팅 목록을 불러오는 중 오류가 발생했습니다.',err);
        }   
      };

    useEffect(() => {
        fetchUsers();
    },[selectedUser]);

    return (
        <div className={styles.chatContainer}>
            <button className={styles.floatingButton} onClick={toggleSideMemoBar}>
                <img src="/images/icons/chat-right-text.svg" style={{ width: '25px', height: '25px', marginRight: '1px' }} alt="+" />
            </button>
            <div className={styles.chatList}>
                {useritems ? useritems.map((useritem, index) => (
                    <div className={styles.chatItem} key={index}
                    onClick={() => setSelectedUser(useritem.chatRoom)} >
                        <div className={styles.avatar}></div>
                        <span className={styles.username}>{useritem.user.nickname}</span>
                    </div>
                )) : (
                    <div className={styles.chatItem} >
                        <div className={styles.avatar}>img</div>
                        <span className={styles.username}>이름</span>
                    </div>
                )}
            </div>

            <div className={styles.chatInputBox}>
                <ChatWindow selectedUser={selectedUser} />
            </div>

            {isSideMemoOpen.isOpen && (
                <SideMemoBar dispatch={dispatch} isopen={isSideMemoOpen} />
            )}
        </div>
    );
};

export default ChatManagement;
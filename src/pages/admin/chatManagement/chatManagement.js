import React, { useReducer, useState } from 'react';
import styles from '../../../styles/admin/chatManagement.module.css';
import SideMemoBar from './sideMemoBar';
import { Link } from 'react-router-dom';


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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSideMemoBar = () => {
        dispatch({ type: 'toggle' });
    };

    return (
        <div className={styles.chatContainer}>
            <button className={styles.floatingButton} onClick={toggleSideMemoBar}>
            <img src="/images/icons/chat-right-text.svg" style={{ width: '25px', height: '25px',marginRight:'1px' }} alt="+" />
            </button>
            <div className={styles.chatList}>
                <div className={styles.chatItem}>
                    <div className={styles.avatar}></div>
                <span className={styles.username}>userid</span>
                </div>
                <div className={styles.chatItem}>
                    <div className={styles.avatar}></div>
                <span className={styles.username}>userid</span>
                </div>
                <div className={styles.chatItem}>
                    <div className={styles.avatar}></div>
                <span className={styles.username}>userid</span>
                </div>
            </div>

            <div className={styles.chatInputBox}>
            <div className={styles.chatWindow}>
            <div className={`${styles.message} ${styles.receivedMessage}`}></div>
            <div className={`${styles.message} ${styles.sentMessage}`}></div>
            </div>
            <div className={styles.messageInputContainer}>
            <textarea className={styles.messageInput} placeholder="메시지를 입력하세요" />
            <button className={styles.sendButton}>
            <img src="/images/icons/send.svg" style={{ width: '25px', height: '25px' }} alt="전송" />
            </button>
            </div>
            </div>
            {isSideMemoOpen.isOpen && (
            <SideMemoBar dispatch={dispatch} isopen={isSideMemoOpen} />
            )}
        </div>
    );
};

export default ChatManagement;
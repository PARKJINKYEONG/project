import React, { useState } from 'react';
import styles from '../../../styles/admin/chatManagement.module.css';



const ChatManagement = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isFloatingContainerOpen, setIsFloatingContainerOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);

        if(isSidebarOpen){

        }
      };

    const toggleFloatingContainer = () => {
        setIsFloatingContainerOpen(!isFloatingContainerOpen);
    };

    return <>
    <div className={`${styles.adminContainer} nanumsqr-korfont`}>
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
                <div className={`${styles.sidebarHeader} ${!isSidebarOpen && styles.sidebarHeaderClosed}`}>
                    <button className={styles.collapseButton} onClick={toggleSidebar}>
                        {isSidebarOpen ? <img src="/images/icons/left.svg" style={{ width: '16px', height: '16px',fill:'#69b2f8' }} alt="<<" />
                         : <img src="/images/icons/right.svg" style={{ width: '16px', height: '16px',fill:'white' }} alt=">>" />}
                    </button>
                </div>
                {isSidebarOpen && (
                    <div>
                        <ul className={styles.menu}>
                            <li className={styles.menuItem}>회원 정보 관리</li>
                            <li className={styles.menuItem}>공지사항 관리</li>
                            <ul className={styles.subMenu}>
                                <li className={styles.subMenuItem}>공지사항</li>
                                <li className={styles.subMenuItem}>팝업 공지</li>
                                <li className={styles.subMenuItem}>메시지 공지</li>
                            </ul>
                            <li className={styles.menuItem}>콘텐츠 관리</li>
                            <li className={styles.menuItem}>통계</li>
                        </ul>
                    </div>
                )}
            </aside>

            <div className={styles.mainContent}>
                <div className={styles.mainContentHeader}>
                    <h3>문의 관리</h3>
                    <button className={styles.floatingButton} onClick={toggleFloatingContainer}>
                        <img src="/images/icons/plus.svg" style={{ width: '20px', height: '20px' }} alt="+" />
                        </button>
                </div>
                <div className={styles.chatContainer}>
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
                </div>
            </div>
            {isFloatingContainerOpen && (
                <div className={styles.floatingContainer}>
                    <button className={styles.closeButton} onClick={toggleFloatingContainer}>
                    <img src="/images/icons/x.svg" style={{ width: '20px', height: '20px' }} alt="x" />
                    </button>
                    <div className={styles.floatingContent}>
                        {/* 플로팅 컨테이너에 표시할 내용을 여기에 추가 */}
                    </div>
                </div>
            )}
        </div>
    </>;
};

export default ChatManagement;
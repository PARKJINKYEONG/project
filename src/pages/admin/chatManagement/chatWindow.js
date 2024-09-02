import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../../styles/admin/chatManagement.module.css';
import axios from 'axios';
import { UserContext } from '../../../contexts/userContext';
import mqtt from 'mqtt';
import useRequest from '../../../hooks/useRequest';

const ChatWindow = ({ selectedUser }) => {

    console.log("is it working",selectedUser);

    const { email } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const chatInput = useRef('');
    const { get } = useRequest();

    const fetchMessages = async (chatroom) => {
        try {
            const response = await get(`/api/chat/${chatroom.id}`);
            //chatroomid를 pathvariable로, user.chatroom id
            console.log("chatWindow", response.data);
            setMessages(response.data ? response.data : []);
        } catch (error) {
            console.error('메시지를 불러오는 중 오류가 발생했습니다.', error);
            setMessages([]);
        }
    };

    

    useEffect(() => {
        fetchMessages(selectedUser);
    }, [selectedUser]);

    const handleKeyPress = (e) => { //엔터누른경우
    
        if (e.key === 'Enter') {
        //   /handleSend();
          // console.log(chatInput.current.value);
          chatInput.current.value ='';
        }
      };

    return <>
            <div className={styles.chatWindow}>
                {messages.map((message, index) => (
                    <div key={index} className={`${styles.message} ${message.user.useremail!==email ? styles.receivedMessage : styles.sentMessage}`}>
                        {message.messageContent}
                    </div>
                ))}
            </div>
            <div className={styles.messageInputContainer}>
                <textarea className={styles.messageInput} placeholder="메시지를 입력하세요" ref={chatInput} onKeyDown={handleKeyPress}/>
                <button className={styles.sendButton}>
                    <img src="/images/icons/send.svg" style={{ width: '25px', height: '25px' }} alt="전송" />
                </button>
            </div>
    </>;
};

export default ChatWindow;
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../../styles/admin/chatManagement.module.css';
import axios from 'axios';
import { UserContext } from '../../../contexts/userContext';
import mqtt from 'mqtt';
import useRequest from '../../../hooks/useRequest';
import { format } from 'date-fns';

const ChatWindow = ({ selectedUser, mqttClient}) => {

    const { email } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const chatInput = useRef('');
    const { get } = useRequest();

    const fetchMessages = async (selectedUser) => {
        try {
            if(selectedUser){
                console.log("선택된 유저:",selectedUser);
                const response = await get(`/api/chat/${selectedUser.id}`);
                //chatroomid를 pathvariable로, user.chatroom id
                console.log("chatWindow", response.data);
                setMessages(response.data ? response.data : []);
            }
            else setMessages([]);
        } catch (error) {
            console.error('메시지를 불러오는 중 오류가 발생했습니다.', error);
            setMessages([]);
        }
    };


    useEffect(() => {
        fetchMessages(selectedUser);  // 선택된 사용자에 맞는 메시지 가져오기
    }, []);

    useEffect(() =>{
        if(mqttClient){
            mqttClient.on('message', (topic, message) => {
            console.log('수신된 메시지:', message.toString());
            setMessages(prevMessages => [...prevMessages, {
                user: { useremail: 'other_user' },  // 메시지 보낸 사용자의 이메일
                messageContent: message.content
                }]);
            });
            
        }
        

    },[selectedUser]);

    // function publishMessage(input){
    //     const now = new Date();
    //     const sendDate = format(now,'yyyy-MM-dd HH:mm:ss');
    //     console.log(client);
    //       if (client) {
    //         console.log("아자뵤~~~",selectedUser.chatRoom.id);
    //         client.publish("chat/"+selectedUser.chatRoom.id, JSON.stringify(
    //         { useremail:email,message_send_date:sendDate,content:input}
    //         ));    
    //         console.log('전송 완료!');
    //       }
    //   };

    const handleSend = async () => {
        const message = chatInput.current.value;
        if (message.trim()) {
            // publishMessage(message);
            setMessages(prev => [...prev, {
                user: { useremail: email },  // 현재 사용자의 이메일
                messageContent: message
            }]);
            chatInput.current.value = '';  // 입력 필드 초기화
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
                <textarea className={styles.messageInput} placeholder="메시지를 입력하세요" ref={chatInput}/>
                <button className={styles.sendButton} onClick={handleSend}>
                    <img src="/images/icons/send.svg" style={{ width: '25px', height: '25px' }} alt="전송" />
                </button>
            </div>
    </>;
};

export default ChatWindow;
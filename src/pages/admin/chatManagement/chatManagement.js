import React, { useContext, useEffect, useReducer, useState } from 'react';
import styles from '../../../styles/admin/chatManagement.module.css';
import SideMemoBar from './sideMemoBar';
import axios from 'axios';
import ChatWindow from './chatWindow';
import useRequest from '../../../hooks/useRequest';
import { UserContext } from '../../../contexts/userContext';
import mqtt from 'mqtt';
import { format } from 'date-fns';

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

    const [isSideMemoOpen, dispatch] = useReducer(sideMemoReducer, initialState);
    const [useritems, setUserItems] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [client, setClient] = useState(null);
    
    const [isConnected, setIsConnected] = useState(false);
    const [newMessageFlags, setNewMessageFlags] = useState({});
    
    const { get } = useRequest();


    const toggleSideMemoBar = () => {
        dispatch({ type: 'toggle' });
    };

    const fetchUsers = async () => {
        try{
          const response = await get('/api/chat/users');
          //console.log(response.data);
          setUserItems(response.data);
              
        } catch(err) {
          console.log('사용자 채팅 목록을 불러오는 중 오류가 발생했습니다.',err);
        }   
      };

    useEffect(() => {
        fetchUsers();
    },[selectedUser]);

    useEffect(() => {
    
        // MQTT 브로커에 연결
        const mqttClient = mqtt.connect('mqtt://localhost:1884');
        
        mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
            setIsConnected(true);
            mqttClient.subscribe("chat/#"); // chat하위 모든 토픽 구독
        });
  
        mqttClient.on('message', (topic, message) => {
            updateNewMessageFlag(topic.slice(5,));
        });
  
        mqttClient.on('error', (err) => {
            console.error('Connection error:', err);
        });
  
        mqttClient.on('close', () => {
            console.log('Disconnected from MQTT broker');
            setIsConnected(false);
        });
  
        setClient(mqttClient);
  
        // 컴포넌트 언마운트 시 클라이언트 종료
        return () => {
            if (mqttClient) {
                mqttClient.end();
            }
        };
    }, []);


    const updateNewMessageFlag = (chatRoomId) => {
        console.log('>>updateNewMessageFlag: ',chatRoomId, selectedUser);
        setNewMessageFlags(prevFlags => ({
            ...prevFlags,
            [chatRoomId]: true,  // 새로운 메시지가 도착한 경우 true로 설정
        }));
    };

    const handleUserItemClick = (chatRoom) => {
        setSelectedUser(chatRoom);
        console.log('>>handleUserItemClick: ',chatRoom,selectedUser);
        setNewMessageFlags(prevFlags => ({
            ...prevFlags,
            [chatRoom.id]: false,  // 클릭한 유저의 새로운 메시지 플래그 해제
        }));
    };

    return (
        <div className={styles.chatContainer}>
            <button className={styles.floatingButton} onClick={toggleSideMemoBar}>
                <img src="/images/icons/chat-right-text.svg" style={{ width: '25px', height: '25px', marginRight: '1px' }} alt="+" />
            </button>
            <div className={styles.chatList}>
                {useritems ? useritems.map((useritem, index) => (
                    <div className={`${styles.chatItem} ${newMessageFlags[useritem.chatRoom.id] ? styles.newMessage : ''}`}
                    key={index} onClick={() => handleUserItemClick(useritem.chatRoom)}>
                   <div className={styles.avatar}></div>
                   <span className={styles.username}>{useritem.user.nickname}</span>
                   {/* <div><small>{format(useritem.chatRoom.lastUpdateDate,'yy/MM/dd HH:mm')}</small></div> */}
                   <span className={styles.newMessageIcon} style={{ visibility: newMessageFlags[useritem.chatRoom.id] ? 'visible' : 'hidden' }}>
                       ●
                   </span>
                   
               </div>
                )) : (
                    <div className={styles.chatItem} >
                        <div className={styles.avatar}>img</div>
                        <span className={styles.username}>이름</span>
                    </div>
                )}
            </div>

            <div className={styles.chatInputBox}>
                <ChatWindow selectedUser={selectedUser} mqttClient={client} />
            </div>

            {isSideMemoOpen.isOpen && (
                <SideMemoBar dispatch={dispatch} isopen={isSideMemoOpen} />
            )}
        </div>
    );
};

export default ChatManagement;
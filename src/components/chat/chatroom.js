import styles from "../../styles/Chatroom.module.css";
import React, { useState, useEffect, useRef } from 'react';
import mqtt from 'mqtt';
import MessageClient from "./messageClient";
import MessageAgent from "./messageAgent";

const chatMessageFetch=()=>{
    console.log('기존 내역 패치중')
    return [{ id:'travelJoy',text: '채팅 이용시간'},{id:'travelJoy', text: '안녕하세요'}];
}

function getNextId(messages){
    //배열의 모든 id값 추출
    // id 값만으로 새로운 배열 생성
    const ids = messages.map(message=>message.id);    //아이디로 이루어진 새로운 배열
    console.log('ids: ',ids);
    return Math.max(...ids)+1;
}


export default function ChatRoom(){
    const [messages, setMessages] = useState(()=>chatMessageFetch());
    let nextMsgId = getNextId(messages);

    const msgRef = useRef('');
    const chatBox = useRef('');

    const [client, setClient] = useState(null);

    useEffect(() => {
        /*
        const websocketClient = new WebSocket('ws://localhost:8000/ws/chat');
        setClient(websocketClient);
    
        websocketClient.onopen = () => {
            console.log("WebSocket connection established");
        };

        websocketClient.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Received WebSocket message: ", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        websocketClient.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => websocketClient.close();
        */

        }, []);
        const sendMessage = () => {
            /*
            if (client) {
                const message = { text: input, timestamp: new Date() };
                console.log("Sending WebSocket message: ", message);
                client.send(JSON.stringify(message));
                setInput('');
            }*/

            // 브로커로 보내기
            const message = msgRef.current.value;
            console.log(message);
            setMessages(previousState=>{ return [...previousState,{id:'client',text:message}];  });
            console.log('---------',messages);
            //{id:nextid,username:usernameRef.current.value, age:ageRef.current.value},...previous
            // msg보내기
            // try{

            // }
            // catch(e){
            //     console.error("Error fetching search results:", error);
            // }

            // 채팅창에 입력 (실패하면 못보낸거 재전송 버튼 추가하기)
            // 채팅창 초기화
            msgRef.current.value='';
            msgRef.current.focus();
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
            
        };

        function autoScrollUp(){
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
        };
    
    return <>
        <div className={`${styles.chatContainer} overflow-hidden`}>
            <div className={`row ${styles.chatHeader}`}>
                <div className={`col-2 ${styles.chatHeaderContent}`}>
                    <button><img src="/images/caret-left-fill.svg" style={{width:'20px',height:'20px'}} alt="left arrow" /> </button>
                </div>
                <div className={`col text-center ${styles.chatHeaderContent}`}> 채팅방 제목</div>
            </div>
            <div className={styles.chatContent}>
                <div className={styles.chatContentBox} ref={chatBox}>채팅 내용
                {messages.map((message, index) => (
                    <div key={index}>
                        {message.id==='travelJoy' && <div className={`${styles.agent} my-3`}><MessageAgent content={message}/></div> }
                        {message.id==='client' && <div className={`${styles.client} my-3`}><MessageClient content={message}/></div>}
                    </div>
                ))}
                </div>
                <div className={styles.chatTextArea}>
                    <input className="col" type="text" ref={msgRef}/>
                    <button className="col-2" onClick={sendMessage}>Send</button>
                </div>
            </div>

            
        </div>
    </>
}
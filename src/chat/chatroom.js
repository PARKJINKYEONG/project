import styles from "../components/styles/Chatroom.module.css";
import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

export default function ChatRoom(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [client, setClient] = useState(null);

    useEffect(() => {
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
        }, []);
        const sendMessage = () => {
            if (client) {
                const message = { text: input, timestamp: new Date() };
                console.log("Sending WebSocket message: ", message);
                client.send(JSON.stringify(message));
                setInput('');
            }
        };
    
    return <>
        <div className={styles.chatContainer}>
            <div className="{styles.chatHeader} row">
                <div className="col-3 {styles.chatHeaderContent}">
                    <button><img src="/images/caret-left-fill.svg" style={{width:'20px',height:'20px'}} alt="left arrow"/> </button>
                </div>
                <div className="col {styles.chatHeaderContent}"> 채팅방 제목</div>
            </div>
            <div className={styles.chatContent}>
                <div className={styles.chatTextContent}>채팅 내용
                {messages.map((message, index) => (
                    <div key={index}>
                        <span>{message.timestamp}</span>: <span>{message.text}</span>
                    </div>
                ))}
                </div>
                <div className={styles.chatTextArea}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
            </div>

            
        </div>
    </>
}
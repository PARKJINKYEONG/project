import React, { useState, useRef, useEffect } from 'react';
import "../../styles/chatBot.css"
import axios from 'axios';
import mqtt from 'mqtt';

const ChatBot = () => {

  //mqtt chatting

  const fetchData = async () =>{
    try{
      const chatroomId = await axios.get('http://localhost:8080/api/chat/topic');
      setTopic(chatroomId.data);
      console.log(chatroomId.data);

    } catch(err) {
      console.log('Error: ',err);
      setTopic("temp");
    } finally{
      //로딩 상태 종료;
    }
  }

  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [topic,setTopic] = useState(()=>fetchData()); // <---------------------- topic 받아오기

  useEffect(() => {
    
      // MQTT 브로커에 연결
      const mqttClient = mqtt.connect('mqtt://localhost:1884');
      
      mqttClient.on('connect', () => {
          console.log('Connected to MQTT broker');
          setIsConnected(true);
          mqttClient.subscribe("chat/"+topic); // 원하는 토픽 구독
      });

      mqttClient.on('message', (topic, message) => {
          console.log('Received message:', message.toString());
          setMessage(message.toString());
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

  function publishMessage(){
      if (client && isConnected) {
          client.publish("chat/"+topic, JSON.stringify({
              sender:'userid',recipient:'수신자?',content:chatInput.current.value
          }));
      }
  };
  //mqtt



  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chatbot');
  
  // 각 탭에 대한 메시지 별도 관리
  const [chatbotMessages, setChatbotMessages] = useState([]);
  const [supportMessages, setSupportMessages] = useState([]);

  //수경
  const chatInput = useRef('');

  // 메시지 컨테이너 참조, 자동 스크롤을 위해
  const messagesEndRef = useRef(null);

  // 자동 스크롤을 위한 useEffect
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatbotMessages, supportMessages]);

  const handleToggle = () => {
    if (isOpen) {
      // 채팅창이 닫힐 때 메시지 초기화
      setChatbotMessages([]);
      setSupportMessages([]);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (chatInput.current.value.trim()) {
      const newMessage = { type: 'user', text: chatInput.current.value };
      
      if (activeTab === 'chatbot') {
        const newMessages = [...chatbotMessages, newMessage];
        setChatbotMessages(newMessages);


        // AI대답
        setTimeout(() => {
          setChatbotMessages([...newMessages, { type: 'ai', text: '안녕하세요' }]);
        }, 500);

      } else if (activeTab === 'support') {
        const newMessages = [...supportMessages, newMessage];
        setSupportMessages(newMessages);//채팅방에 채팅메세지 추가

        publishMessage();//mqtt pub

        handleSupportMessage(newMessages);
      }
    }
  };

  const handleSupportMessage = (newMessages) => {
    // 예시: 상담원 응답 시뮬레이션
    setTimeout(() => {
      setSupportMessages([...newMessages, { type: 'support', text: '상담원이 곧 답변을 드릴 것입니다.' }]);
    }, 2000);
  };

  const handleKeyPress = (e) => { //엔터누른경우
    
    if (e.key === 'Enter') {
      handleSend();
      // console.log(chatInput.current.value);
      chatInput.current.value ='';
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="chatbot">
      <button className="chatbot-button" onClick={handleToggle}>
        🤔
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-tabs">
            <button 
              className={`tab ${activeTab === 'chatbot' ? 'active' : ''}`} 
              onClick={() => handleTabChange('chatbot')}
            >
              챗봇
            </button>
            <button 
              className={`tab ${activeTab === 'support' ? 'active' : ''}`} 
              onClick={() => handleTabChange('support')}
            >
              1:1상담
            </button>
          </div>
          <div className="chatbot-messages">
            {(activeTab === 'chatbot' ? chatbotMessages : supportMessages).map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input type="text" ref={chatInput} onKeyDown={handleKeyPress}
              placeholder="입력해주세요"
            />
            <button onClick={handleSend} className="send-button"><img src='/images/send.svg'/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

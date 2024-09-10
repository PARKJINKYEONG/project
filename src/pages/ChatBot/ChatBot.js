import React, { useState, useRef, useEffect, useContext } from 'react';
import "../../styles/chatBot.css"
import axios from 'axios';
import mqtt from 'mqtt';
import { UserContext } from '../../contexts/userContext';
import { format } from 'date-fns';
import useRequest from '../../hooks/useRequest';
import Loading from "../../components/loading";

const ChatBot = () => {

  const { email } = useContext(UserContext);
  const { get } = useRequest();
  const [loading,setLoading] = useState(false);

  //mqtt chatting

  const fetchData = async () =>{
    try{
      if(!email){
        const chatroomId = await axios.get('http://localhost:8080/api/chat/topic');
        setTopic(chatroomId.data);
      }
      else{
        const chatroomId = await get(`/api/chat/topic`);
        setTopic(chatroomId.data);
        console.log(chatroomId.data);
      }
      

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
  const [topic,setTopic] = useState(()=>fetchData());

  useEffect(() => {
    
      // MQTT 브로커에 연결
      const mqttClient = mqtt.connect('mqtt://localhost:1884');
      
      mqttClient.on('connect', () => {
          console.log('Connected to MQTT broker');
          setIsConnected(true);
          console.log(topic);
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

  function publishMessage(input){
    const now = new Date();
    const sendDate = format(now,'yyyy-MM-dd HH:mm:ss');
      if (client && isConnected) {
        if(email){
          client.publish("chat/"+topic, JSON.stringify(
            { useremail:email,message_send_date:sendDate,content:input}
            ));
        }
        else{
          client.publish("chat/"+topic, JSON.stringify(
            { useremail:'userid',message_send_date:sendDate,content:input }
            ));
        }

      }
  };
  //mqtt


  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chatbot');
  const chatInput = useRef('');
  
  // 각 탭에 대한 메시지 별도 관리
  const [chatbotMessages, setChatbotMessages] = useState([]);
  const [supportMessages, setSupportMessages] = useState([]);

  //chatbot
  async function sendQueryToOPENAI(newMessage) {
    try {

      const response = await axios.post('http://localhost:8000/ai/chatbot', {
        name: "user",
        description: newMessage,
      });
      return response.data.content;
  
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

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

  const handleSend = async () => {
    if (chatInput.current.value.trim()) {
      const input =  chatInput.current.value;
      const newMessage = { type: 'user', text: input };
      chatInput.current.value='';
      if (activeTab === 'chatbot') {
        
        setChatbotMessages((prev) => [...prev, newMessage]);
        setLoading(true); //로딩이미지
        try {
          
          const botResponse = await sendQueryToOPENAI(newMessage.text); // OpenAI API 응답 대기
          setChatbotMessages((prev) => [ ...prev, { type: 'ai', text: botResponse }, ]);
          
        } catch (error) {
          console.error('Error in chatbot:', error);
          setChatbotMessages((prev) => [ ...prev, { type: 'ai', text: "연결이 불안정하여, 잠시 후 다시 시도해 주시기 바랍니다." }, ]);
          chatInput.current.value=input;
        }
        setLoading(false);
      } else if (activeTab === 'support') {

        setSupportMessages((prev) => [...prev, newMessage]); // 채팅방에 채팅 메세지 추가
  
        publishMessage(input); // MQTT pub
  
        //handleSupportMessage();
      }
    }
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
        <img src='/images/chat/joy.png' width='56px' alt='Joy'/>
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-tabs">
            <button 
              className={`tab ${activeTab === 'chatbot' ? 'active' : ''}`} 
              onClick={() => handleTabChange('chatbot')}
            >
              조이
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
            {loading && <Loading width={50} height={50}/>} 
            {/* 로딩이미지 */}
          </div>
          <div className="chatbot-input">
            <input type="text" ref={chatInput} onKeyDown={handleKeyPress}
              placeholder="입력해주세요"
            />
            <button onClick={handleSend} className="send-button"><img src='/images/icons/send.svg'/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

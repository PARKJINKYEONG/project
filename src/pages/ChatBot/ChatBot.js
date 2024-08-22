import React, { useState, useRef, useEffect } from 'react';
import "../../styles/chatBot.css"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  // 각 탭에 대한 메시지 별도 관리
  const [generalMessages, setGeneralMessages] = useState([]);
  const [supportMessages, setSupportMessages] = useState([]);
  
  const [input, setInput] = useState('');

  // 메시지 컨테이너 참조
  const messagesEndRef = useRef(null);

  // 자동 스크롤을 위한 useEffect
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [generalMessages, supportMessages]);

  const handleToggle = () => {
    if (isOpen) {
      // 채팅창이 닫힐 때 메시지 초기화
      setGeneralMessages([]);
      setSupportMessages([]);
    }
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { type: 'user', text: input };
      
      if (activeTab === 'general') {
        const newMessages = [...generalMessages, newMessage];
        setGeneralMessages(newMessages);
        setInput('');

        // AI 응답
        setTimeout(() => {
          setGeneralMessages([...newMessages, { type: 'ai', text: '안녕하세요' }]);
        }, 500);

      } else if (activeTab === 'support') {
        const newMessages = [...supportMessages, newMessage];
        setSupportMessages(newMessages);
        setInput('');

        // 1:1 상담에서는 메시지를 서버로 전송하는 로직을 추가할 수 있음
        handleSupportMessage(newMessages);
      }
    }
  };

  const handleSupportMessage = (newMessages) => {
    // 예시: 상담원 응답 시뮬레이션
    setTimeout(() => {
      setSupportMessages([...newMessages, { type: 'support', text: '상담원이 곧 답변을 드릴 것입니다.' }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
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
              className={`tab ${activeTab === 'general' ? 'active' : ''}`} 
              onClick={() => handleTabChange('general')}
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
            {(activeTab === 'general' ? generalMessages : supportMessages).map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={handleSend} className="send-button">➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

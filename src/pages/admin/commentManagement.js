import React, { useState } from'react';

import styles from '../../styles/chatManagement.module.css';

const CommentManagement = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'User1', messages: ['Hello!'] },
    { id: 2, name: 'User2', messages: ['Hi there!'] },
    { id: 3, name: 'User3', messages: ['Good day!'] },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const handleChatClick = (chat) => {
        setSelectedChat(chat);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '' && selectedChat) {
            const updatedChats = chats.map(chat => 
                chat.id === selectedChat.id 
                    ? { ...chat, messages: [...chat.messages, newMessage] } 
                    : chat
            );
            setChats(updatedChats);
            setNewMessage('');
        }
    };
    return <>
      <div className={styles.container}>
            <div className={styles.leftPanel}>
              {chats.map(chat => (
                      <div 
                          key={chat.id} 
                          onClick={() => handleChatClick(chat)}
                          className={styles.chatItem}
                      >
                          {chat.name}
                      </div>
                  ))}
            </div>
            <div className={styles.topRightPanel}>
              {selectedChat ? (
                      selectedChat.messages.map((msg, index) => (
                          <div key={index} className={styles.message}>
                              {msg}
                          </div>
                      ))
                  ) : (
                      <div className={styles.placeholder}>Select a chat to view messages</div>
                  )}
            </div>
            <div className={styles.bottomRightPanel}>
                <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className={styles.inputField}
                    />
                <button onClick={handleSendMessage} className={styles.sendButton}>
                    Send
                </button>
            </div>
        </div>
    </>
};
export default CommentManagement;


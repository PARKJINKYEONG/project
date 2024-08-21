
import React, { useState } from "react";

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  Avatar,
  Sidebar,
  ConversationList,
  Conversation,
  ConversationHeader,
  MessageSeparator,
  Message,
} from "@chatscope/chat-ui-kit-react";

const CommentManagement = () => {
    const [activeConversation, setActiveConversation] = useState("bloodstrawberry");
    const [conversations, setConversations] = useState({
      bloodstrawberry: [
        {
          content: "This is bloodstrawberry's message",
          sender: "bloodstrawberry",
          direction: "incoming",
          sentTime: "10 mins ago",
        },
      ],
      Patrik: [
        {
          content: "This is Patrik's message.",
          sender: "Patrik",
          direction: "incoming",
          sentTime: "5 mins ago",
        },
      ],
    });   

  const handleSend = (message) => {
    const newMessage = {
        content: message,
        sender: "User",
        direction: "outgoing",
      };
  
      setConversations({
        ...conversations,
        [activeConversation]: [...conversations[activeConversation], newMessage],
      });
  };

  const handleConversationClick = (name) => {
    setActiveConversation(name);
  };

  return (
    <div>
      
      <MainContainer
        responsive
        style={{
          height: "600px",
        }}
      >
        <Sidebar position="left">
          <ConversationList>
            <Conversation
              active={activeConversation === "bloodstrawberry"}
              info="This is bloodstrawberry's message"
              lastSenderName="bloodstrawberry"
              name="bloodstrawberry"
              onClick={() => handleConversationClick("bloodstrawberry")}
            >
              <Avatar
                status="available"
                src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
                
              />
            </Conversation>
            <Conversation
              active={activeConversation === "Patrik"}
              info="This is Patrik's message"
              lastSenderName="Patrik"
              name="Patrik"
              onClick={() => handleConversationClick("Patrik")}
            >
              <Avatar
                name="Patrik"
                src="https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg"
                status="invisible"
              />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar />
            <ConversationHeader.Content
              info="Active 10 mins ago"
              userName={activeConversation}
              
            />
          </ConversationHeader>
          <MessageList>
            {conversations[activeConversation].map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.content,
                  sentTime: msg.sentTime || "just now",
                  sender: msg.sender,
                  direction: msg.direction,
                }}
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
export default CommentManagement;



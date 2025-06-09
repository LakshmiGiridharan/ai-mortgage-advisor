// src/components/ChatWidget.jsx
import React, { useState } from 'react';
import ChatBot from './ChatBot';
import './chatbot.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget">
      {isOpen && <ChatBot />}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : '💬 NEED HELP?\nChat now with our AI bot'}
      </button>
    </div>
  );
};

export default ChatWidget;

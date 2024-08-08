import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat= () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get('/api/chat')
      .then(response => setChats(response.data))
      .catch(error => console.error('Error fetching chats:', error));
  }, []);

  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat._id}>
            <strong>{chat.author}: </strong>{chat.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;

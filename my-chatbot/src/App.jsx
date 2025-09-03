import React, { useState } from "react";
import ChatBox from "./components/chatbot";
import Conversations from "./components/conversations";
import "./styles/styles.css";

function App() {
  // State for all conversations and their messages
  const [conversations, setConversations] = useState([
    //Emptyt to start with no conversations
  ]);

  const [activeChatId, setActiveChatId] = useState(0); // Default to Chat 1

  // Add a new conversation
  const handleAddChat = () => {
    const newId = conversations.length + 1;
    setConversations([
      ...conversations,
      { id: newId, name: `Chat ${newId}`, messages: [] },
    ]);
    setActiveChatId(newId); // Automatically switch to the new chat
  };

  
  //Rename Conversation function
  const renameConversation = (id, newName) => {
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, name: newName } : conv
    ));
  };


  //delete conversation function
  const deleteConversation = (id) => {
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);
    // If the deleted conversation was active, set activeChatId to another valid chat
    if (activeChatId === id) {
      setActiveChatId(updatedConversations[0]?.id || 0);
    }
  };



  const handleSendMessage = (newMessages) => {
    setConversations(
      conversations.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, ...(Array.isArray(newMessages) ? newMessages : [newMessages])] }
          : chat
      )
    );
  };





  // Active conversation messages
  const activeMessages =
    conversations.find((chat) => chat.id === activeChatId)?.messages || [];

  return (
    <div className="app">
      <Conversations
        conversations={conversations}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        handleAddChat={handleAddChat}
        renameConversation={renameConversation} // added
        deleteConversation={deleteConversation} // added
      />
      <ChatBox messages={activeMessages} handleSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;

import React, { useState } from "react";

function Conversations({
  conversations,
  activeChatId,
  setActiveChatId,
  handleAddChat,
  renameConversation,
  deleteConversation,
}) {
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const handleEditClick = (id, name) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
    setRenamingId(null);
    setRenameValue(name);
  };

  const handleRename = (id) => {
    if (renameValue.trim()) {
      renameConversation(id, renameValue.trim());
      setRenamingId(null);
      setDropdownOpenId(null);
    }
  };

  return (

    <div className={`conversationPanel ${isOpen ? "open" : "closed"} `}>

      <div className="logoheader">
        <img src="../images/deepseek-color.png" alt="Deepseek logo" id="logo" />
        <h3>DeepSeek</h3>
      </div>


      <button
        type="button"
        id="sideBarButton"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="../images/sidebar.png" alt="sidebar icon" />
      </button>



      <button type="button" id="addChatButton" onClick={handleAddChat}>
        <img src="../images/newChat.png" alt="new chat" />
        <span id="addChatText">New Chat</span>
      </button>

      <div className="conversations">
        {conversations.map((chat) => (
          <div key={chat.id} style={{ position: "relative", width: "100%" }}>
            <button
              className={activeChatId === chat.id ? "active" : ""}
              onClick={() => setActiveChatId(chat.id)}
              style={{ width: "100%" }}
            >
              {chat.name}
              <button
                id="editButton"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(chat.id, chat.name);
                }}
              >
                <img
                  src="../images/threedots.png"
                  alt="chat icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </button>

            {/* Dropdown menu for each conversation */}
            {dropdownOpenId === chat.id && (
              <div className="dropdownMenu">
                {renamingId === chat.id ? (
                  //If the chat is being renamed, show input box
                  <div className="renameBox">
                    <input
                      type="text"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      style={{ width: "120px" }}
                    />
                    <button onClick={() => handleRename(chat.id)}>Save</button>
                    <button onClick={() => setRenamingId(null)}>Cancel</button>
                  </div>
                ) : (
                  // Otherwise, show Rename and Delete options
                  <>
                    <button onClick={() => setRenamingId(chat.id)}>Rename</button>
                    <button
                      onClick={() => {
                        deleteConversation(chat.id);
                        setDropdownOpenId(null);  //closes dropdown after chat is deleted
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
        <button type="button" id="profileButton">
          <img src="../images/profile.png" alt="profile icon" />
          <span id="profileName">My Profile</span>
        </button>
    </div>
  );
}

export default Conversations;

import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
      });
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">Chat Room</div>

      <div className="messages-section">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.uid === currentUser?.uid ? "sent" : "received"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;

import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase";
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // 🔄 Real-time message listener
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // ➕ Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: input,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
    });

    setInput("");
  };

  // 🚪 Logout user
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to ChatRoom</h2>
      <button onClick={logout}>Logout</button>

      <div style={{ border: "1px solid gray", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg) => (
          <p key={msg.id}><strong>{msg.email}</strong>: {msg.text}</p>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;

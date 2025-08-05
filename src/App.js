import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ChatRoom from "./Pages/ChatRoom";
import Navbar from "./Components/Navbar";
import Landing from "./Pages/Landing";
import "./App.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={user ? <ChatRoom /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

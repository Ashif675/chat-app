import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>👋 Welcome to Chat Connect</h1>
        <p>Join the real-time chat room and connect instantly!</p>

        <div className="button-group">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;

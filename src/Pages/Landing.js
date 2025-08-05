import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <h2>Welcome to Cheating Chat App</h2>
      <div className="button-group">
        <Link to="/login">
          <button className="landing-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="landing-button">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
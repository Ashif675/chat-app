import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/chat">Chat</Link>
      {auth.currentUser && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
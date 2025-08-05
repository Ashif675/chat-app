import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getAuth, signOut } from "firebase/auth";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Chat App</Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link> {/* Goes to Landing Page */}
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <Link to="/form">Form</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

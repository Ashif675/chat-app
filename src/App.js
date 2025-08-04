import logo from './logo.svg';
import './App.css';
import React from 'react';
import firebase from 'firebase/compat/app';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import login from './Pages/Login';
import signup from './Pages/Signup';
import chatRoom from './Components/ChatRoom';
import Massage from './Pages/Massage';
import Navbar from './Pages/Navbar';



function App() {
  return (
    <div className="App">
      <Router>
      <Router>
          <Route exact path="/" element={Home} />
          <Route path="/login" element={login} />
          <Route path="/signup"element={signup} />
          <Route path="/chatroom" element={chatRoom} />
          <Route path="/massage" element={Massage} />
          <Route path="/Navbar" element={Navbar} />
        </Router>
      </Router>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Welcome to the Cheat App</h1>
      
    </div>
  );
}

export default App;

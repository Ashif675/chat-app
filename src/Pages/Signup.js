import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import navigate from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Nevigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Nevigate('/chatroom'); // Redirect to chatroom on successful signup
        }
        catch (error) {
            console.error("Error signing up:", error);
            alert("Failed to sign up. Please check your credentials.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>        
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}    
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}

export default Signup

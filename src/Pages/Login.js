// Step 1: Import React and Hooks
import React, { useState } from 'react';

// Step 2: Import Firebase Auth functions
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

// Step 3: Create Login component
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/chatroom'); // Redirect to chatroom on successful login
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Failed to log in. Please check your credentials.");
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>  
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
}
export default Login;

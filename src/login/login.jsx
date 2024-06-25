import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const logo="BlogSpace";
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/users/login', { username, password });
            console.log(response);
            // localStorage.setItem('token', response.data.token);
            localStorage.setItem('token', response.data);
            navigate("/blogForm");

            // Handle successful login (e.g., redirect to dashboard)

        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (e.g., show error message)
        }
    };

    const handleSignup = () =>{
        navigate("/register");

    }
    return (
        <>
            <div className='main-middle'>
                <div className="logo">
                    <p>{logo}</p>
                </div>
                <div className="credentials">
                    <div>
                        <label>Username:</label>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignup}>Register</button>
                </div>
            </div>
        </>
        
    );
};

export default Login;

import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
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

    return (
        <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

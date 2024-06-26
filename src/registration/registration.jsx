import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./registration.css";

export default function Register () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:8080/users', { 
                username, password});
            alert("Successfully Registered");
            // Handle successful registration (e.g., show success message)
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle registration error (e.g., show error message)
        }

        navigate("/");
    };

    const logo="BlogSpace";

    return (
        <>
            <div className='main-middle'>
                <div className='logo'>
                <p>{logo}</p>
                </div>
                <div className="credentials">
                    <div className="heading">
                        New User Registration
                    </div>
                    <div className="input-container">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-container">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" onClick={handleRegister}>Register</button>
                </div>
            </div>
        </>
    );
};



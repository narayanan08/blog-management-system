import React, { useState } from 'react';
import AuthService from '../../services/auth';
import "./login.css";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await AuthService.register(username, password);
      setMessage('Registration successful! You can now log in.');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const logo = "BlogSpace";

  return (
    <div className='main-middle'>
      <p>{logo}</p>
      <div className="credentials">
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
    <>
    </>
  );
}

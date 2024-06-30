import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import "./login.css";

const secretKey = '12345678901234567890123456789012';

const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
}

const Login = () => {
    const [currusername, setCurrUsername] = useState('');
    const [currpassword, setCurrPassword] = useState('');
    const navigate = useNavigate();
    const logo = "BlogSpace";

    const handleLogin = async () => {
        try {
            const encryptedUsername = encrypt(currusername);
            const encryptedPassword = encrypt(currpassword);

            const requestBody = {
                username: encryptedUsername,
                password: encryptedPassword
            };

            const response = await axios.post(
                'https://29f4-14-194-85-214.ngrok-free.app/users/login',
                requestBody,
                {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            );

            console.log(response);
            localStorage.setItem('token', response.data);
            navigate("/homePage");
        } catch (error) {
            if(error.name==="AxiosError"){   ///If you don't get into this remove this conditional statement
                alert("Not a registered user! Please Register!")
            }
        }
    };

    const handleSignup = () => {
        navigate("/register");
    }

    return (
        <>
            <div className='main-middle'>
                <div className="logo">
                    {logo}
                </div>
                <div className="credentials">
                    <div>
                        <label>Username: </label>
                        <input type="text" placeholder="Username" value={currusername} onChange={(e) => setCurrUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" placeholder="Password" value={currpassword} onChange={(e) => setCurrPassword(e.target.value)} />
                    </div>
                    <button id="login" onClick={handleLogin}>Login</button>
                    <button id="register" onClick={handleSignup}>Register</button>
                </div>
            </div>
        </>
    );
};

export default Login;
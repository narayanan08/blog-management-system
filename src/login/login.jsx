import './login.css';
import React from 'react';
import blog_logo from "./blog_logo.png";
import {redirect} from "react-router-dom";
import CreateUser from '../new_user/new_user';
import ReactDOM from "react-dom/client";
import { useNavigate} from 'react-router-dom';
import {useState} from 'react';
import AuthService from './auth.service';
import axios from 'axios';

export default function Login(){

    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [message,setMessage]= useState('');
    const navigate = useNavigate();

    const handleSignUp = () =>{
        navigate("/signup");
    }

    const handleLogin = async (e) =>{
        //Authentication logic comes here
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/login",{username,password});
            console.log(response.data);
            setMessage('Login successful!');
        }catch(error){
            console.error('Login error',error);
            setMessage('Login failed. Please check your username and password');
        }
    }
    const logo = "BlogSpace";
    return (
        <>
            
            <div className="main-middle">
                
                <div className="logo">
                    <p>{logo}</p>
                </div>
                <div className="credentials">
                    {/* <Detail forid={"username"} label={"Enter username:"} type={"text"} placeholder={"John234"}/><br/><br/>
                    <Detail forid={"password"} label={"Enter password:"} type={"password"} placeholder={""}/>
                    <Button type={"submit"} handlingFunction={handleSignUp} name={"Sign Up"}/>
                    <Button type={"submit"} handlingFunction={handleLogin} name={"Login"}/> */}
                    <form onSubmit = {handleLogin}>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange = {(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="buttons">
                    
                </div>
            </div>
        </>
    )
}

function Detail({forid,label,type,placeholder}){
    return (<>
    <label for={forid}>{label}</label>
    <input type={type} placeholder={placeholder} width={50}></input><br/>
    
    </>
)
}

function Button({type,handlingFunction,name}){
    return(
        <>
        <button type={type} onClick={()=>{
            const root=ReactDOM.createRoot(document.getElementById('root'));
            root.render(<CreateUser/>);
        }}>{name}</button>
        </>
    )
}


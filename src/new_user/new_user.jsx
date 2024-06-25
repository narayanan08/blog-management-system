import React from "react";
import axios from 'axios';
import {useState} from 'react';


export default function CreateUser(){
    const [username, setUsername]=useState("");
    const [password,setPassword]=useState("");

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/users",{username,password});
            console.log(response.data);
            // setMessage('Login successful!');
        }catch(error){
            console.error('Login error',error);
            // setMessage('Login failed. Please check your username and password');
        }

    }

    return(
        <>
            <div className="title">Create Account</div>
            <div className="details">
                <Detail forid={"username"} labelText={"Username:"} type={"text"} id={"username"} placeholder={"NoobBlogger12"} onChangeEvent={(e)=>setUsername(e.target.value)}/><br/>
                <Detail forid={"password"} labelText={"Password:"} type={"password"} id={"password"} placeholder={""} onChangeEvent={(e) => setPassword(e.target.value)}/><br/>
                <Detail forid={"password"} labelText={"Confirm Password:"} type={"password"} id={"password"} placeholder={""}/><br/>
            </div>
            <button type="submit" id="submit-button" onClick={handleCreateUser}>Create Account</button>
        </>
    )
}

function Detail({forid,labelText,type,id,placeholder,onChangeEvent}){
    return(
        <>
            <label for={forid}>{labelText}</label>
            <input type={type} id={id} placeholder={placeholder} onChange={onChangeEvent}></input>
        </>
    )
}


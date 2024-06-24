import React from "react";

export default function CreateUser(){
    return(
        <>
            <div className="title">Create Account</div>
            <div className="details">
                <Detail forid={"username"} labelText={"Username:"} type={"text"} id={"username"} placeholder={"NoobBlogger12"}/><br/>
                <Detail forid={"password"} labelText={"Password:"} type={"password"} id={"password"} placeholder={""}/><br/>
                <Detail forid={"password"} labelText={"Confirm Password:"} type={"password"} id={"password"} placeholder={""}/><br/>
            </div>
            <button type="submit" id="submit-button">Create Account</button>
        </>
    )
}

function Detail({forid,labelText,type,id,placeholder}){
    return(
        <>
            <label for={forid}>{labelText}</label>
            <input type={type} id={id} placeholder={placeholder}></input>
        </>
    )
}


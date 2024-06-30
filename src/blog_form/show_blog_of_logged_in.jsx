import React, { useState } from 'react';
import axios from 'axios';
import "./show_blog.css";
import { useNavigate, useParams } from 'react-router-dom';

export default function ShowBlogOfLoggedIn(){
    
    const navigate=useNavigate();

    const {title,content,likesCount,timeStamp}=useParams();
    const logo="BlogSpace";
    return (
        <div className="main-body">
            <div className='logoo'>
                {logo}
            </div>
            <div className='main-body-blogForm'>
                <textarea id="title" type="text" placeholder={title} disabled="true"/><br></br>
                <textarea id="content" placeholder={content} disabled="true"/>
            </div>
            <div>
                <div>Likes Count: {likesCount}</div>
                <div>TimeStamp:{timeStamp}</div>
            </div>
        </div>
    );
};



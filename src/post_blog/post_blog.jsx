import React from "react";
import { useNavigate } from "react-router-dom";
import profile_pic from "../home_page/profile_pic.jpg";
import "./post_blog.css";
export default function PostBlog(){
    
    return(
        <>
        <Header/>
        <div className="main-body">
            <div className="new-post">
                <p>NEW POST</p><br></br>
                <label for="title">Title:</label><br></br>
                {/* <input type="text" id="title"></input><br></br> */}
                <textarea></textarea><br></br>
                <label for="body">Body:</label><br></br>
                <textarea id="body"></textarea><br></br>
                <button type="submit">Post</button>
            </div>
            <div className="right-side">
            </div>
        </div>
        </>
    )
}

function Header(){
    const logo="BlogSpace";
    const navigate = useNavigate();

    
    return(
        <>
            <body>
            <header>
                <div className="logo">
                    <span>{logo}</span>
                </div>
                
            </header>

            </body>


        </>
    )
}

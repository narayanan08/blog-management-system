import { useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import profile_pic from "../home_page/profile_pic.jpg";
import axios from "axios";
import "./post_blog.css";
export default function PostBlog(){
    const [title,setTitle]=useState(" ");
    const [content,setContent]= useState(" ");
    const [access,setAccess]= useState(" ");
    const {userId} = useParams();

    const savePost = () => {
        console.log(title);
        console.log(content);
        console.log(access);

        function getCurrentDateTime() {
            // Create a new Date object
            const currentDate = new Date();
          
            // Extract date and time components
            const date = currentDate.toLocaleDateString(); // Format: MM/DD/YYYY
            const time = currentDate.toLocaleTimeString(); // Format: HH:MM:SS
          
            // Combine date and time
            const dateTimeString = `${date} ${time}`;
          
            return dateTimeString;
          }
          
        const date= getCurrentDateTime();
        console.log(date);
        // console.log(date.split(" "));

        const data={
            userId,title,content,access,date
        }
        
        const response = axios.post("http://localhost:8080/users/",data);
        console.log(response);
    }

    return(
        <>
        <Header/>
        <div className="main-body">
            <div className="new-post">
                <p>NEW POST</p><br></br>
                <label for="title">Title:</label><br></br>
                {/* <input type="text" id="title"></input><br></br> */}
                <textarea id="title" onChange={(e) => setTitle(e.target.value)}></textarea><br></br>
                <label for="body">Body:</label><br></br>
                <textarea id="body" onChange={(e) => setContent(e.target.value)}></textarea><br></br>
                <button onClick={()=>setAccess("public")}>Public</button> 
                <button onClick={()=>setAccess("private")}>Private</button><br></br>
                <button type="submit" onClick={savePost}>Post</button>
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
                <div className="Logo">
                    <span>{logo}</span>
                </div>
                
            </header>

            </body>


        </>
    )
}

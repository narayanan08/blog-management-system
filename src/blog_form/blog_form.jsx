import React, { useState } from 'react';
import axios from 'axios';
import "./blog_form.css";
import { useNavigate } from 'react-router-dom';

export default function BlogForm(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState("");  // Default to public
    const [button1,setButton1] = useState(false);
    const [button2,setButton2] = useState(false);
    const navigate=useNavigate();
    const handleCreateBlog = async () => {

        
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "ngrok-skip-browser-warning":"true"
                }
            };

            console.log( { title, content, status });
            const response = await axios.post('https://29f4-14-194-85-214.ngrok-free.app/posts/users', { 
                title, content, status }, 
                config);
            // Handle successful blog creation (e.g., show success message)
            alert("Post saved successfully!");
            navigate("/homePage");
            
        } catch (error) {
            console.error('Blog creation failed:', error);
            // Handle blog creation error (e.g., show error message)
        }
    };


    function update(access,button_no){
        let button1,button2;
        if(button_no==1){
             
            setButton1(true);
            setButton2(false);
            console.log(button_no);
        }
        else{
            setButton1(false);
            setButton2(true);
             console.log(button_no);
        }
        // button1.disabled = true;
        // button2.disabled = false;
        setStatus(access);
    }
    const logo="BlogSpace";
    return (
        <div className="blogForm-main-body">
            <div className='blogForm-logo'>
                {logo}
            </div>
            <div className='blogForm-main-body-blogForm'>
                <textarea id="blogForm-title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br></br>
                <textarea id="blogForm-content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} /><br></br>
                <p>Status: {status}</p>
            </div>
            <div id="blogForm-buttons">
                <button id="blogForm-1" disabled={button1} onClick={()=>update("public",1)}>Public</button> 
                <button id="blogForm-2" disabled={button2} onClick={()=>update("private",2)}>Private</button>
            </div>
            <button onClick={handleCreateBlog}>Create Blog</button>
        </div>
    );
};



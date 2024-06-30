import React, { useState } from 'react';
import axios from 'axios';
import "./blog_form.css";
import { useNavigate } from 'react-router-dom';

export default function BlogForm(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState("");  // Default to public
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
    const logo="BlogSpace";
    return (
        <div className="main-body">
            <div className='logoo'>
                {logo}
            </div>
            <div className='main-body-blogForm'>
                <textarea id="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br></br>
                <textarea id="content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
            <button onClick={()=>setStatus("public")}>Public</button> 
            <button onClick={()=>setStatus("private")}>Private</button>
            </div>
            <button onClick={handleCreateBlog}>Create Blog</button>
        </div>
    );
};



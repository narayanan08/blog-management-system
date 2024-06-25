import React, { useState } from 'react';
import axios from 'axios';
import "./blog_form.css";

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [access, setAccess] = useState("");  // Default to public

    const handleCreateBlog = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            console.log( { title, content, access });
            const response = await axios.post('http://localhost:8080/posts/users', { title, content, access }, config);
            // Handle successful blog creation (e.g., show success message)
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
            <button onClick={()=>setAccess("public")}>Public</button> 
            <button onClick={()=>setAccess("private")}>Private</button>
            </div>
            <button onClick={handleCreateBlog}>Create Blog</button>
        </div>
    );
};

export default BlogForm;

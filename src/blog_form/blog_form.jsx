import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(true);  // Default to public

    const handleCreateBlog = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.post('/api/blogs', { title, content, isPublic }, config);
            // Handle successful blog creation (e.g., show success message)
        } catch (error) {
            console.error('Blog creation failed:', error);
            // Handle blog creation error (e.g., show error message)
        }
    };

    return (
        <div>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <label>
                Public:
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            </label>
            <button onClick={handleCreateBlog}>Create Blog</button>
        </div>
    );
};

export default BlogForm;

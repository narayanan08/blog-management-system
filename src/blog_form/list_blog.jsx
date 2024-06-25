import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <p>{blog.isPublic ? 'Public' : 'Private'}</p>
                    {/* Display other blog details */}
                </div>
            ))}
        </div>
    );
};

export default ListBlogs;

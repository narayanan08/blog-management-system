import React, { useEffect, useState } from 'react';

const Blog = ({ blogId, title, content }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Check if the blog is already liked when the component mounts
        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];
        if (likedBlogs.includes(blogId)) {
            setLiked(true);
        }
    }, [blogId]);

    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            // Update local storage
            const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];
            likedBlogs.push(blogId);
            localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
        }
    };

    return (
        <div className="blog">
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={handleLike} disabled={liked}>
                {liked ? 'Liked' : 'Like'}
            </button>
        </div>
    );
};

export default Blog;

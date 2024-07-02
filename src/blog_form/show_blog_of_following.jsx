import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowBlogOfFollowing() {
    const navigate = useNavigate();
    const { title, content, likesCount, timeStamp, blogId } = useParams();
    const logo = "BlogSpace";

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(likesCount);

    useEffect(() => {
        // Retrieve liked blogs from localStorage
        const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
        setLiked(likedBlogs.includes(blogId));

        // Retrieve likes count from localStorage, or use the initial likesCount if not found
        const savedLikesCount = JSON.parse(localStorage.getItem(`likesCount_${blogId}`));
        if (savedLikesCount !== null) {
            setLikes(savedLikesCount);
        } else {
            localStorage.setItem(`likesCount_${blogId}`, JSON.stringify(likesCount));
        }
    }, [blogId, likesCount]);

    const updateLike = async ()=>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `https://29f4-14-194-85-214.ngrok-free.app/posts/likes/${blogId}`,
                {},{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "ngrok-skip-browser-warning":"true"
                    }
                }
            );
            console.log(response.data);
            alert("You have liked the post");
            navigate("/homePage");
        }catch(error){
            console.log(`Error : ${error}`);
        }finally{

        }
    }

    const handleLike = () => {
        if (!liked) {
            const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
            likedBlogs.push(blogId);
            localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
            setLiked(true);
            const newLikesCount = parseInt(likes) + 1;
            setLikes(newLikesCount);
            localStorage.setItem(`likesCount_${blogId}`, JSON.stringify(newLikesCount));
            
        }
        updateLike();
    };

    return (
        <div className="main-body">
            <div className="logoo">{logo}</div>
            <div className="main-body-blogForm">
                <textarea id="title" type="text" placeholder={title} disabled={true} /><br />
                <textarea id="content" placeholder={content} disabled={true} />
            </div>
            <div>
                <div>
                    <button onClick={handleLike} disabled={liked}>
                        {liked ? "Liked" : "Like!"}
                    </button>
                    <Likes count={likes} />
                </div>
                <div>TimeStamp: {timeStamp}</div>
            </div>
        </div>
    );
}

function Likes({ count }) {
    return (
        <p>Likes Count: {count}</p>
    );
}

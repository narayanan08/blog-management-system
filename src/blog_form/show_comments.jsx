

import { useEffect, useState } from "react";
import profile_pic from "../home_page/profile_pic.jpg";
import "./show_comments.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ShowComments() {
    const { postId,isLoggedInUser } = useParams();
    console.log("post id inside Showcomments="+postId);

    const [comments, setComments] = useState([]);

    //Actual data collection and filtering must come here
    function filterData(data) {
        console.log(`Data inside filterdata: ${JSON.stringify(data)}`);
        const tempComments = data.map(comment => ({
            id: comment.id,
            comment: comment.comment
        }));
        console.log(`Temporary data: ${JSON.stringify(tempComments)}`);
        setComments(tempComments);
    }

    useEffect(() => {
        console.log(`Post id=,${postId}`);
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(`token:${token}`);
                const config = {
                    
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning":"true"
                    }
                };
                const response = await axios.get(
                    `https://29f4-14-194-85-214.ngrok-free.app/comments/getcomments?post_id=${postId}`,
                    config
                );
                console.log(`Response Body has this: ${response.data}`);
                filterData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchComments();
    }, [postId]);

    return (
        <>
            <>
            <Header />
            {isLoggedInUser === 'true' ? null : <TypeComment postId={postId} allComments={comments} />}
            <DisplayComments comments={comments} />
        </>
        </>
    )
}

function Header() {
    const logo = "BlogSpace";
    return (
        <header>
            <div><span id="logo">{logo}</span></div>
            <div id="search"><input type="text" placeholder="type here to search" /></div>
            <img src={profile_pic} alt="Profile" />
        </header>
    );
}

function TypeComment({ postId, allComments }) {
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const saveComment = async () => {
        try {
            const token = localStorage.getItem("token");
            const responseBody = { postId, comment };
            console.log(`token:${token}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning":"true"
                    
                },
            }
            const response = await axios.post(
                "https://29f4-14-194-85-214.ngrok-free.app/comments/createcomments",
                responseBody,
                config
            );
            console.log(response);
            alert("Comment is saved successfully!");
            navigate("/homepage");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div id="comment-section">
            <div id="instruction">
                <p>Type comment here:</p>
            </div>
            <textarea onChange={(e) => setComment(e.target.value)}></textarea><br />
            <button onClick={saveComment}>Submit</button>
        </div>
    )
}

function DisplayComments({ comments }) {
    return (
        <div id="comments">
            {comments.map((comment, index) => <DisplayOneComment key={comment.id} comment={comment} />)}
        </div>
    )
}

function DisplayOneComment({ comment }) {
    return (
        <div id="comment">
            {/* <p>Comment Id: {comment.id}</p> */}
            <p>Comment: {comment.comment}</p>
        </div>
    )
}

import "./home_page.css";
import profile_pic from "./profile_pic.jpg";
import like_pic from "./like_pic.png";
import {useState,useEffect,useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";


export default function HomePage({data}){
    const [blogs,setBlogs]=useState([]);
    const [userId,setUserId]= useState("");
    const navigate = useNavigate();
    let {credentials}= useParams();
    console.log(credentials);
    const creds = credentials.split("+");
    const username=creds[0];
    const password=creds[1];
    
    useEffect(() => {
        const fetchBlogs = async() => {
        try {
            const response = await axios.get("http://localhost:8080/posts/getdetails",{username,password});
            setUserId(response.id);
            console.log(response.id);
            // console.log(response.data.blogs);
            setBlogs(response.data);
        } catch(err){
            if(err.response){
            // Not in the 200 response range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            } else{
            console.log(`Error: ${err.message}`);
            }
        }
        }

        fetchBlogs();
    })

//   console.log(blogs);
    return(
        <>
        <Header userId={userId}/>
        <div class="mainBody">
            <GetMyAllBlogs blogs={blogs}/>
            {/* <p>{credentials}</p> */}
            <GetAllRecentPosts/>
        </div>
        </>
    )
    
}

function Header({username,userId}){
    const logo="BlogSpace";
    const navigate = useNavigate();
    const handlePost = () =>{
        navigate(`/postBlog/${userId}`)
    }
    return(
        <>
            <body>
            <header>
                <div className="account-properties">
                    <span>{logo}</span>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="search here..."></input>
                </div>
                <div className="account-properties">
                    <span onClick={(userId)=>{handlePost(userId)}}>Post</span>
                    <span>Followers</span>
                    <span>Following</span>
                    <img src={profile_pic}></img>
                </div>
            </header>

            </body>


        </>
    )
}

function GetMyAllBlogs({blogs}){
    const myRef = useRef(null);
    function loadMore(){
        let currHt = document.querySelector(".myAllBlogs").style;
        console.log(currHt.height);
        // document.querySelector(".myAllBlogs").style.height = calc(document.querySelector(".myAllBlogs").style.height *2) ;
    }
    return(
        <>
        <div>
        <p style={{fontSize:30+"px",display:"flex",marginLeft:10+"px"}}> My Blogs </p>
        <div class="myAllBlogs">
            {
            blogs.map(blog => (
            <GetOneBlog title={blog.title} likesCount={blog.likes} timeStamp={blog.timeStamp}/>
            ))
            }
            <GetOneBlog title={"Python"} likesCount={90} timeStamp={"2024-06-20 18:30"}/>
            <GetOneBlog title={"C++"} likesCount={89} timeStamp={"2024-06-20 17:30"}/>
            <GetOneBlog title={"Java"} likesCount={87} timeStamp={"2024-05-21 16:30"}/>

            
            
        </div>
        <button ref={myRef} type="button" onClick={loadMore}>Load More</button>
        </div>
        </>
    )
}

function GetAllRecentPosts(){
    return(
        <>
            <div>
                <p style={{fontSize:30+"px",display:"flex",marginLeft:10+"px"}}> Others Posts </p>
                <div class="myFollowingBlogs">
                <GetOneBlog title={"Title 3"} likesCount={98}/>
                <GetOneBlog title={"Title 2"} likesCount={94}/>
                <GetOneBlog title={"Title 1"} likesCount={90}/>
                </div>
            </div>
        </>
    )
}

function GetOneBlog({title,likesCount,timeStamp}){
    const navigate = useNavigate();
    const showFullblog = () =>{
        navigate("/blog/:title")
    }

    return(
        <>
        <div className="blog">
            <div class="blog-header">
                <p class="blog-title" onClick={showFullblog}>{title}</p>
                <p class="timeStamp">Created at:{timeStamp}</p>
            </div>
            <div className="blog-footer">
                <div className="likes">
                    <img src={like_pic}></img>
                    <p className="likes" style={{margin:0+"px",marginLeft:5+"px"}}>
                        {likesCount}
                    </p>
                </div>
                <div className="comments">
                    <p style={{margin:0+"px"}}>comments</p>
                </div>
            </div>
        </div>
        </>
    )
}



// function loadMore(){
//     const element = document.getElementById("myAllBlogs");
//     element.style.height*=2;
// }
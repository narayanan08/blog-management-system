import "./home_page.css";
import profile_pic from "./profile_pic.jpg";
import like_pic from "./like_pic.png";
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../api/blogs";
import Post from "../post_blog/post_blog.jsx";
import {useRef} from 'react';

export default function HomePage(){
    const [blogs,setBlogs]=useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchBlogs = async() => {
        try {
            const response = await api.get("/blogs");
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
        <Header/>
        <div class="mainBody">
            <GetMyAllBlogs blogs={blogs}/>
            <GetAllRecentPosts/>
        </div>
        </>
    )
    
}

function Header(){
    const logo="BlogSpace";
    const navigate = useNavigate();

    const handlePost = () =>{
        navigate("/postBlog")
    }
    return(
        <>
            <body>
            <header>
                <div className="logo">
                    <span>{logo}</span>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="search here..."></input>
                </div>
                <div className="account-properties">
                    <span onClick={handlePost}>Post</span>
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
    return(
        <>
        <div className="blog">
            <div class="blog-header">
                <p class="blog-title">{title}</p>
                <p>Created at:{timeStamp}</p>
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
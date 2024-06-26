import { useNavigate ,Link} from "react-router-dom";
import "./home_page.css";
import profile_pic from "./profile_pic.jpg";
import like_pic from "./like_pic.png";
import { useState , useEffect } from "react";
import axios from 'axios';


// const posts = [
    
//     {
//         "id":1,
//         "title":1,
//         "likes":1,
//         "users":1,
//         "comments":1,
//         "content":1,
//         "status":1,
//         "created_at":1,
//     },
//     {
//         "id":1,
//         "title":1,
//         "likes":1,
//         "users":1,
//         "comments":1,
//         "content":1,
//         "status":1,
//         "created_at":1,
//     }

// ]


const logo="BlogSpace";

export default function HomePage(){
    const token = localStorage.getItem("token");
    
    const [blogs, setBlogs] = useState([]);

    function filterData(posts){
        console.log(`post:${posts}`);
        const tempData = [...posts];
        const newData = [];
        for(let i=0;i<tempData.length;i++){
            console.log(tempData[i]);
            const timeStamp= new Date(tempData[i].created_at).toDateString();
           
            const oneBlog = {"id":tempData[i].id,"title":tempData[i].title,"likes":tempData[i].likes,"content":tempData[i].content,"status":tempData[i].status,"timeStamp":timeStamp};
            console.log(`oneblog=${oneBlog.id}`);
            // console.log(timeStamp);
            newData.push(oneBlog);
        }
        setBlogs(newData);

        console.log(blogs);
    }




    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const token = localStorage.getItem('token')
            // Replace 'YOUR_BACKEND_URL/api/blogs' with your actual backend endpoint
            const response = await axios.post('http://localhost:8080/posts/getdetails', {},
                {headers:{
                  Authorization: `Bearer ${token}`, // Replace with your token retrieval logic
                }},
            );
            filterData(response.data); // Assuming response.data is an array of blogs
          } catch (error) {
            console.log(error.message);
          } finally {
            
          }
        };
    
        fetchBlogs();
      }, []); // Empty dependency array ensures useEffect runs only once on component mount



    return(
        <>
            <Header/>
            <div id="main-body">
                <div id="content">
                    <GetLoggedInUserBlogs blogs={blogs}/>
                    <GetFollowingBlogs/>
                </div>
                <div id="decoration"></div>
            </div>
        </>
    )
}

function Header(){

    const logo="BlogSpace";
    const navigate = useNavigate();

    const handlePost = () =>{
        navigate("/blogForm")
    }
    return(
        <>
            <header>
                <div ><span id="logo">{logo}</span> </div>
                <div id="search"> <input type="text" placeholder="type here to search"></input></div>
                <div id="account-properties">
                    <div><span id="Post" onClick={handlePost}>Post</span></div>
                    <div><span id="followers">Followers</span></div>
                    <div><span id="following">Following</span></div>
                    <img src={profile_pic}></img>
                </div>
            </header>


        </>
    )
}


function GetFollowingBlogs(){

}

function GetLoggedInUserBlogs({blogs}){
    console.log(blogs);
    blogs.map((blog,index)=>(console.log(blog.id)));
    function loadMore(){
        let currHt = document.querySelector(".myAllBlogs").style;
        console.log(currHt.height);
        // document.querySelector(".myAllBlogs").style.height = calc(document.querySelector(".myAllBlogs").style.height *2) ;
    }
    return(
        <>
        <div id="myBlogs">
        <p style={{fontSize:30+"px",display:"flex",marginLeft:640+"px"}}> My Blogs </p>
        {/* <div>
        
        <div class="myAllBlogs"> */}
            
            {   
                blogs.map((blog,index)=>(
                    // console.log(blog.id);

                    <GetOneBlog blog_id={blog.id} content={blog.content} title={blog.title} likesCount={blog.likes} timeStamp={blog.timeStamp}/>
                ))
            }
            
            {/* <GetOneBlog blog_id={1} title={"Python"} content={"PythonPythonPythonPythonPythonPythonPython"} likesCount={90} timeStamp={"2024-06-23 18:30"}/>
            <GetOneBlog blog_id={2} title={"Java"} content={"JavaJavaJavaJavaJavaJavaJavaJavaJavaJavaJava"} likesCount={90} timeStamp={"2024-06-23 18:30"}/>
            <GetOneBlog blog_id={3} title={"C++"} content={"C++C++C++C++C++C++C++C++C++C++C++C++"} likesCount={90} timeStamp={"2024-06-23 18:30"}/> */}


            
        </div>
        </>
    )
}
function GetOneBlog({blog_id,title,content,likesCount,timeStamp}){
    console.log("inside getoneblog="+blog_id);
    console.log(`timeStamp = ${timeStamp}`)
    const navigate = useNavigate();
    const showBlogInSeperatePage = () =>{
        

    }

    const showBlogInFullScreen = () =>{
       
    }

    const showComments = (blog_id) =>{
        console.log(blog_id);
        navigate(`/showComments`,{state:{postId:blog_id}});
    }


    return(
        
        <div className="blog" onClick={showBlogInSeperatePage}>
            <div className="blog-header">
                <p id="blog-title" onClick={showBlogInFullScreen}>{title}</p>
                <p>Created at:{timeStamp}</p>
            </div>
            <div className="content">
                {content}
            </div>
            <div className="blog-footer">
                <div className="likes">
                    <img src={like_pic}></img>
                    <p className="likes" style={{margin:0+"px",marginLeft:5+"px"}}>
                        {likesCount}
                    </p>
                </div>
                <div className="comments">
                    {/* <p id="comments" onClick={(blog_id)=>{showComments(blog_id)}}>comments</p> */}
                    <Link to={`/showComments/${blog_id}`}>Comments</Link>
                </div>
            </div>
        </div>
    
    )
}

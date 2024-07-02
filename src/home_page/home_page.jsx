
import { useNavigate, Link } from "react-router-dom";
import "./home_page.css";
import profile_pic from "./profile_pic.jpg";
import like_pic from "./like_pic.png";
import { useState, useEffect } from "react";
import axios from 'axios';
import DynamicSearch from "./searchh";

const logo = "BlogSpace";

// Sample data for testing dynamic search
const mockUsernames = [
    "john_doe",
    "jane_doe",
    "user123",
    "blogger456",
    "tech_guru",
    "coding_master",
    "dev_enthusiast",
    "designer_life",
    "travel_lover",
    "foodie_jane",
    "sports_fanatic"
];

const sampleBlogs = [
    {
        id: 1,
        title: "First Blog",
        likes: 10,
        content: "This is the first blog content.",
        status: "public",
        created_at: new Date().toDateString(),
    },
    {
        id: 2,
        title: "Second Blog",
        likes: 20,
        content: "This is the second blog content.",
        status: "public",
        created_at: new Date().toDateString(),
    },
];

const sampleFollowingBlogs = [
    {
        id: 3,
        title: "Following Blog",
        likes: 5,
        content: "This is the following blog content.",
        status: "public",
        created_at: new Date().toDateString(),
    },
];

const following = [
    "user123",
    "blogger456",
    "tech_guru",
    "coding_master",
    "dev_enthusiast",
    "designer_life",
    "travel_lover",
]


export default function HomePage() {
    const token = localStorage.getItem("token");
    
    console.log(token);
    
    
    

    function filterData(posts,isFromLoggedUser) {
        
        const tempData = [...posts];
        const newData = [];
        for (let i = 0; i < tempData.length; i++) {
            const timeStamp = new Date(tempData[i].created_at).toDateString();
            const oneBlog = {
                "id": tempData[i].id,
                "title": tempData[i].title,
                "likes": tempData[i].likes,
                "content": tempData[i].content,
                "status": tempData[i].status,
                "timeStamp": timeStamp
            };
           if(isFromLoggedUser===false){
            console.log(typeof tempData[i].users.username);
            oneBlog.username= tempData[i].users.username;
           }
            
            
            newData.push(oneBlog);
        }
        return newData;
        console.log(blogs);
    }
    //To get logged in user's blogs
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(`Bearer ${token}`);
                const response = await axios.get(
                    'https://29f4-14-194-85-214.ngrok-free.app/posts/getdetails',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "ngrok-skip-browser-warning":"true"
                        }
                    }
                );
                setBlogs(filterData(response.data,true)); // Assuming response.data is an array of blogs
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchBlogs();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    // This will get all the usernames
    const [usernames, setUsernames] = useState([]);

    let allUsernames=[];
    function filterOnlyUsernames(data){
        for(let i=0;i<data.length;i++){
            allUsernames.push(data[i].username);
        }
    }


    useEffect(()=>{
        const fetchUsernames = async () =>{
            try{
                const token = localStorage.getItem("token");
                const config = {
                    headers:{
                       Authorization:`Bearer ${token}`,
                       "ngrok-skip-browser-warning":"true"
                    }
                }
                const response = await axios.get(
                    "https://29f4-14-194-85-214.ngrok-free.app/users",
                    config
                );
                filterOnlyUsernames(response.data);
                setUsernames(allUsernames);
                console.log(`allUsernames : ${allUsernames}`);
            }catch(error){
                console.log("Error"+error);
            }
            
        }
        fetchUsernames();
        
    },[])
    console.log(`usernames = ${usernames}`);

    //get all the following people
    const [following, setFollowing] = useState([]);
    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                };
                const response = await axios.get(
                    "https://29f4-14-194-85-214.ngrok-free.app/follows",
                    config
                );

                console.log(`Followers Response Body: ${response.data}`);
                setFollowing(response.data); 
            } catch (error) {
                console.log(`Error: ${error.response}`);
            }
        };
        fetchFollowing();
    }, []);

    
    let userNamesForSearch = [];
    for(let i=0;i<usernames.length;i++){
        if(following.indexOf(usernames[i])===-1){
            userNamesForSearch.push(usernames[i]);
        }
    }



    
 
    
    const [followingBlogs,setFollowingBlogs] = useState([]);
    //To get the blogs of the following people
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'https://29f4-14-194-85-214.ngrok-free.app/posts/following',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "ngrok-skip-browser-warning":"true"
                        }
                    }
                );
                console.log(` Following blogs:${response.data}`)
                setFollowingBlogs(filterData(response.data,false)); // Assuming response.data is an array of blogs
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchBlogs();
    }, []); 

    

    return (
        <>
            {/* <Header usernames={userNamesForSearch} />
            <div id="homepage-main-body">
                <div id="homepage-content">
                    <GetLoggedInUserBlogs blogs={blogs} isLoggedInUser={false} />
                    <GetFollowingBlogs blogs={followingBlogs} isLoggedInUser={true} />
                </div>
                <div id="decoration"></div>
            </div> */}
            <Header usernames={userNamesForSearch}  />
            <div id="homepage-main-body">
                <div id="homepage-content">
                    <GetLoggedInUserBlogs blogs={blogs} isLoggedInUser={false} />
                    <GetFollowingBlogs blogs={followingBlogs} isLoggedInUser={true} />
                </div>
                <div id="decoration"></div>
            </div>
        </>
    );
}


function Header({  usernames, following }) {
    const logo = "BlogSpace";
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handlePost = () => {
        navigate("/blogForm");
    };

    

    const handleLogout = async()=>{
        try{
            const config = {
                headers:{
                    Authorization : `Bearer ${token}`,
                    "ngrok-skip-browser-warning":"true"
                }
            }
            const response = await axios.post("https://29f4-14-194-85-214.ngrok-free.app/users/logout",{},config);
            alert("You have logged out!");
            navigate("/");

        }catch(error){
            console.log(`Error : ${error}`)
        }
        
    }

    const showFollowing = ()=>{
        navigate("/following")
    }

    //This will do the dynamic search
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsernames, setFilteredUsernames] = useState([]);
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    
        if (value === '') {
          setFilteredUsernames([]);
        } else {
          const tempUsernames = usernames.filter(username =>
            username.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredUsernames(tempUsernames);
        }
      };

    function handlePersonPage(name){
        navigate(`/${name}`)
    }

    
    
    console.log(`Results inside : ${usernames} `)
    return (
        <>
            <header>
                <div><span id="homepage-logo">{logo}</span></div>
                <div id="homepage-home-page-search">
                    <input
                        type="text"
                        placeholder="Search usernames..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {usernames.length > 0 &&  (
                        <ol className="homepage-username-list">
                        {filteredUsernames.map((filteredUsername, index) => (
                            
                                <li key={index} onClick={() => handlePersonPage(filteredUsername)}>
                                <Link to={`/${filteredUsername}`}>{filteredUsername}</Link>
                                </li>
                            
                            ))}
                        </ol>
                    )}
                </div>
                <div id="homepage-account-properties">
                    <div>
                        <span id="homepage-Post" onClick={handlePost}>
                            Post
                        </span>
                    </div>
                    
                    <div>
                        <span id="homepage-following" onClick={showFollowing}>
                            Following
                        </span>
                        
                    </div>
                    <div>
                        <span id="homepage-logout" onClick={handleLogout}>
                            Logout
                        </span>
                        

                    </div>
                </div>
            </header>
        </>
    );
}

function GetFollowingBlogs({blogs, isLoggedInUser}) {
   
    blogs.map((blog, index) => (console.log(blog.id)));

    function loadMore() {
        let currHt = document.querySelector(".homepage-myAllBlogs").style;
        console.log(currHt.height);
    }

    return (
        <>
            <div id="myBlogs">
                
                <p style={{ fontSize: 30 + "px", display: "flex", marginLeft: 640 + "px" }}> My Following Blogs </p>
                {blogs.map((blog, index) => (
                    <GetOneBlog
                        username = {blog.username}
                        key={index}
                        blog_id={blog.id}
                        content={blog.content}
                        title={blog.title}
                        likesCount={blog.likes}
                        timeStamp={blog.timeStamp}
                        isLoggedInUser={false}
                    />
                ))}
            </div>
        </>
    );
}

function GetLoggedInUserBlogs({ blogs, isLoggedInUser }) {
    
    

    function loadMore() {
        let currHt = document.querySelector(".homepage-myAllBlogs").style;
        console.log(currHt.height);
        // document.querySelector(".myAllBlogs").style.height = calc(document.querySelector(".myAllBlogs").style.height *2) ;
    }

    return (
        <>
            <div id="homepage-myBlogs">
                <p style={{ fontSize: 30 + "px", display: "flex", marginLeft: 710 + "px" }}> My Blogs </p>
                {blogs.map((blog, index) => (
                    <GetOneBlog
                        username={null}
                        key={index}
                        blog_id={blog.id}
                        content={blog.content}
                        title={blog.title}
                        likesCount={blog.likes}
                        timeStamp={blog.timeStamp}
                        isLoggedInUser={true}
                    />
                ))}
            </div>
        </>
    );
}

function GetOneBlog({ username,blog_id, title, content, likesCount, timeStamp, isLoggedInUser}) {
    let random = JSON.stringify(username);
    console.log("for logged in user : "+random);
    const navigate = useNavigate();

    const showBlogInSeperatePage = () => {
        // navigate(`/blog/${blog_id}`);
    };

    const showBlogInFullScreen = () => {
        // navigate(`/blog/${blog_id}`);
    };

    return (
        <div className="homepage-blog" onClick={showBlogInSeperatePage}>
            <div className="homepage-blog-header">
            {/* <p>{username}</p> */}
            <p id="homepage-username">{username}</p>
            {isLoggedInUser === true ? <Link to={`/fullContent/true/${title}/${content}/${likesCount}/${timeStamp}`}><p id="homepage-blog-title" onClick={showBlogInFullScreen}>{title}</p></Link> : <Link to={`/fullContent/false/${title}/${content}/${likesCount}/${timeStamp}/${blog_id}`}><p id="homepage-blog-title" onClick={showBlogInFullScreen}>{title}</p></Link> }
                
            
                <p>Created at: {timeStamp}</p>
            </div>
            <div className="homepage-content">
                {content}
            </div>
            <div className="homepage-blog-footer">
                <div className="homepage-likes">
                    <img src={like_pic} alt="Likes" />
                    <p className="homepage-likes" style={{ margin: 0 + "px", marginLeft: 5 + "px" }}>
                        {likesCount}
                    </p>
                </div>
                <div className="homepage-comments">
                    <Link to={`/showComments/${blog_id}/${isLoggedInUser}`}>Comments</Link>
                </div>
            </div>
        </div>
    );
}





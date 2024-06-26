// import { useEffect,useState } from "react";
// import profile_pic from "../home_page/profile_pic.jpg"
// import "./show_comments.css";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from 'axios';


// export default function ShowComments(){
    
//     const {postId} = useParams();

//     const [comments,setComments]= useState([]);
//     //Actual data collection and filtering must come here
//     function filterData(data){
//         console.log(`Data inside filterdata: ${data}`);
//         const tempComments=[];
//         for(let i=0;i<data.length;i++){
//             const comment = {"id":data[i].id,"comment":data[i].comment};
//             tempComments.push(comment);
//         }
//         console.log(`Temporary data: ${tempComments}`);
//         setComments(comments);

//     }

//     useEffect(() =>{
//         const fetchComments = async () => {
//             try{
//                 const token = localStorage.getItem("token");
//                 const response = await axios.post("https://2bf7-14-194-85-214.ngrok-free.app/comments/getcomments",
//                     {postId},
//                     {
//                         headers:{
//                             Authorization : `Bearer ${token}`,
//                             "ngrok-skip-browser-warning":"true"
//                         },
//                     }
//                 );
//                 console.log(`Response Body has this :${response}`)
//                 filterData(response.data);

//             }catch(error){
//                 console.log(error.message);
//             }finally{

//             }
//         };
//         fetchComments();
//     },[])

//     return (
//         <>
//             <Header/>
//             <TypeComment postId={postId} allComments={comments}/>
//             <DisplayComments comments={comments}/>
//         </>
//     )

// }

// function Header(){

//     const logo="BlogSpace";
    

   
//     return(
//         <>
//             <header>
//                 <div ><span id="logo">{logo}</span> </div>
//                 <div id="search"> <input type="text" placeholder="type here to search"></input></div>
//                 <img src={profile_pic}></img>
                
//             </header>


//         </>
//     )
// }


// function TypeComment({postId, allComments}){
//     // const [allComments,setAllComments] = useState([...allComments]);
//     const [comment, setComment] = useState("");
//     const navigate = useNavigate();
//     const saveComment= async()=>{

//         try{
//             const token = localStorage.getItem("token");
//             const response = await axios.post("https://015d-14-194-85-214.ngrok-free.app/comments/createcomments",  // what response comes for saving?
//                 {
//                     postId,comment,
//             },
//             {
//                 headers:{
//                     Authorization: `Bearer ${token}`,
//                     "ngrok-skip-browser-warning":"true"
//                 },
//             }
//             );
//             console.log(response);
//             alert("Comment is saved successfully!");
//             navigate("/homepage");
            
//         }
//         catch(error){
//         console.log(error.message);
//         } finally{

//         }
//     }

//     return(
//         <>  
//             <div id="comment-section">
//                 <div id="instruction">
//                     <p id="">Type comment here:</p>
//                 </div>
//                 <textarea onChange={(e)=>setComment(e.target.value)}></textarea><br></br>
//                 <button onClick={saveComment}>Submit</button>
//             </div>
//         </>
//     )
// }


// function DisplayComments({comments}){
//     return(
//         <>
//             <title>Comments</title>
//             <div id="comments">
//             {
//                 comments.map((comment,index)=><DisplayOneComment comment={comment}/>)
//             }
//             </div>


//         </>
//     )
// }

// function DisplayOneComment({comment}){
    
//     return(
//         <>
//             <div id="comment">
//                 <p>Comment Id:{comment.cid}</p>
                
//                 <p>Comment:{comment.con}</p>
                
//             </div>
//         </>
//     )

// }



import { useEffect, useState } from "react";
import profile_pic from "../home_page/profile_pic.jpg";
import "./show_comments.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ShowComments() {
    const { postId } = useParams();
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
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    "http://localhost:8080/comments/getcomments",
                    { postId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(`Response Body has this: ${JSON.stringify(response.data)}`);
                filterData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchComments();
    }, [postId]);

    return (
        <>
            <Header />
            <TypeComment postId={postId} allComments={comments} />
            <DisplayComments comments={comments} />
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
            const response = await axios.post(
                "http://localhost:8080/comments/createcomments",
                { postId, comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        
                    },
                }
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
            <p>Comment Id: {comment.id}</p>
            <p>Comment: {comment.comment}</p>
        </div>
    )
}

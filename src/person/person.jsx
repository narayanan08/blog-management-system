import axios from "axios";
import "./person.css";
import { useParams , useNavigate} from "react-router-dom";
export default function SomePerson(){
    const logo="BlogSpace";
    const {somePersonUserName} = useParams();
    const navigate = useNavigate();
    function followUser(){
        try{
            
            const token = localStorage.getItem("token");
            const requestBody={
                somePersonUserName
            }
            const config = {
                headers:{
                    Authorization : `Bearer ${token}`,
                    "ngrok-skip-browser-warning":"true"
                }
            }
            const response =axios.post("https://29f4-14-194-85-214.ngrok-free.app/follows/users",
                requestBody,
                config
            )
            alert(`You are following ${somePersonUserName}`)
            navigate("/homePage")
            
        }
        catch(error){
            console.log("Error: "+error);
        }
    }
    return(
        <div className="person-main-body">
            <div className='person-logo'>
                {logo}
            </div>
            <div className="person-username-button">
                
                    <p className="person-username">{somePersonUserName}</p>
                    <button onClick={followUser} id="person-button">Click to Follow</button>
                
                
            </div>
        </div>
    )
}
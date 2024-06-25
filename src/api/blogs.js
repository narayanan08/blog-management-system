import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:3500"  //Change this port to backend's port later
    
})
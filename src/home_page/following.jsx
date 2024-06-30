import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Following() {
    const [following, setFollowing] = useState([]);
    const logo = "BlogSpace";
    const navigate = useNavigate();

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

    async function handleRemovingFollowing(value) {
        console.log("Value = " + value);
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "true"
                }
            };
            const requestBody = {
                somePersonUserName: value
            };
            const response = await axios.post(
                "https://29f4-14-194-85-214.ngrok-free.app/follows/delete",
                requestBody,
                config
            );
            alert(`You no longer follow ${value}`);

            // Remove the user from the local state after successful deletion
            setFollowing(prevFollowing => prevFollowing.filter(item => item !== value));
            navigate("/homePage");
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return (
        <>
            <div className="following-main-body">
                <div className='following-logo'>
                    {logo}
                </div>
                <div className="following-usernames">
                    {following.map((value, index) => {
                        return (
                            <div key={index}>
                                <p>{value}</p>
                                <button id="delete-following" onClick={() => handleRemovingFollowing(value)}>
                                    delete
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

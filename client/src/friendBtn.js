import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function FriendBtn() {
    const [buttonText, setButtonText] = useState();
    const { id } = useParams();
    //needs to recieve the id of otherUser profile so that we can communicate with server in our useEffect
    //we'LL need to make a fetch to the server to add/cancel/Accept friendship with this user.
    useEffect(() => {
        console.log("FriendBtn just mounted");
        fetch(`/api/users/friendship/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("friendship status:", data);
                setButtonText(data);
            });
    }, [id]);
    return (
        <>
            <button>BUTTON TEXT</button>
        </>
    );
}

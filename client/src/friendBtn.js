import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function FriendBtn(otherUserId) {
    const [buttonText, setButtonText] = useState("");
    const { id } = useParams();
    //needs to recieve the id of otherUser profile so that we can communicate with server in our useEffect
    //we'LL need to make a fetch to the server to add/cancel/Accept friendship with this user.
    useEffect(() => {
        console.log("FriendBtn just mounted");
        console.log("OtherUserId from get", otherUserId);

        fetch(`/api/users/friendship/${otherUserId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("friendship status:", data);
                setButtonText(data);
            });
    }, []);

    function friendshipClick() {
        console.log("friendshipClick button was clicked");

        console.log("this this:", otherUserId);

        fetch(`/friendship.json/${otherUserId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: buttonText }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("response data from /friendship.json:", data);
                setButtonText(data);
            });
    }

    return (
        <>
            <button className="friend_button" onClick={friendshipClick}>
                {buttonText}
            </button>
        </>
    );
}

import { useDispatch, useSelector } from "react-redux";
import {
    recieveFriendsAndWannabees,
    makeFriend,
    DeleteFriend,
} from "./redux/friends-and-wannabees/slice.js";
import { useEffect } from "react";

export default function FriendsAndWannabees() {
    const dispatch = useDispatch(); // to dispatch state

    const wannabees = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendship) => !friendship.accepted
            )
    ); // to pickup from the state we use useSelector
    console.log("wannabees:", wannabees);

    const friends = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendship) => friendship.accepted
            )
    );
    console.log("friends:", friends);

    useEffect(() => {
        //Step 1: fetch friends and wannabees
        console.log("friendsAndWannables just mounted");
        fetch("/friends-and-wannabees")
            .then((res) => res.json())
            .then((data) => {
                //recieve data back
                console.log("all friends data:", data);
                //Step 2: dispatch action to populate the redux state
                dispatch(recieveFriendsAndWannabees(data));
            });
    }, []);

    const handleAccept = (id) => {
        console.log("button was clicked");
        console.log("handle accept id:", id);
        // step 1: Make a POST request to update the DB
        fetch("/friendship/accept", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("response data from accept/friendship.json:", data);
                // Step 2: Dispatch an action to update the Redux store
                dispatch(makeFriend(id));
            });

        // action creator makeFriend
    };

    const handleDelete = (id) => {
        console.log("button was clicked");
        console.log("handle delete id:", id);
        // step 1: Make a POST request to update the DB
        fetch("/friendship/end", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(
                    "response data from delete /friendship.json:",
                    data
                );
                // Step 2: Dispatch an action to update the Redux store
                dispatch(DeleteFriend(id));
            });

        // action creator makeFriend
    };
    return (
        <>
            <h1>These people wanna be your friends</h1>
            <div className="wannabees">
                {wannabees &&
                    wannabees.map((wannabee) => {
                        return (
                            <div key={wannabee.id}>
                                <img
                                    className="search-pic"
                                    src={wannabee.image_url}
                                />
                                <div>
                                    {wannabee.first} {wannabee.last}
                                </div>
                                <button
                                    onClick={() => handleAccept(wannabee.id)}
                                >
                                    Accept Friendship
                                </button>
                            </div>
                        );
                    })}
            </div>

            <h1>These people are your friends</h1>
            <div className="friends">
                {friends &&
                    friends.map((friend) => {
                        return (
                            <div key={friend.id}>
                                <img
                                    className="search-pic"
                                    src={friend.image_url}
                                />
                                <div>
                                    {friend.first} {friend.last}
                                </div>
                                <button onClick={() => handleDelete(friend.id)}>
                                    End Friendship
                                </button>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

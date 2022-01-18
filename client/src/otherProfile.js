import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import FriendBtn from "./friendBtn";

export default function OtherProfile() {
    const { id } = useParams();
    const [user, setUser] = useState();
    const history = useHistory();

    // console.log("otherUserid from params:", id);
    // console.log("user:", user);

    useEffect(() => {
        console.log("OtherProfile just mounted");
        fetch(`/api/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data of selected other profile user:", data);
                if (data.success === false) {
                    history.replace("/");
                } else {
                    setUser(data);
                }
            });
    }, [id]);

    return (
        <>
            {user && (
                <div className="otherUser_result" key={user.id}>
                    <img className="search-other_pic" src={user.image_url} />
                    <p>
                        {user.first} {user.last}
                    </p>
                    <p>{user.bio}</p>
                </div>
            )}

            <FriendBtn />
        </>
    );
}

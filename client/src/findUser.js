import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";

export default function FindUser() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("FindUser just mounted");
    }, []);

    useEffect(() => {
        let abort = false;
        console.log("useEffect mounted");

        if (!search) {
            fetch("/recentUsers").then((res) =>
                res.json().then((data) => {
                    console.log("these are the latest users", data);
                    setUsers(data);
                })
            );
        } else {
            fetch(`/findUsers/${search}`)
                .then((res) => res.json())
                .then((users) => {
                    if (!abort) {
                        console.log("users in the search", users);
                        setUsers(users);
                    }
                });
        }
        return () => {
            abort = true;
        };
    }, [search]);

    // const imageError = (e) => {
    //     e.currentTarget.setAttribute("src", "/default.png");
    // };

    return (
        <>
            <div className="find_users_container">
                <h3>Checkout who just joined!</h3>

                {users.map((user) => (
                    <div className="search-results" key={user.id}>
                        <Link
                            className="otherUsers_link"
                            to={`/users/${user.id}`}
                        >
                            <ProfilePic
                                first={user.first}
                                last={user.last}
                                imageUrl={user.image_url}
                                loggerFunc={user.logNameOtherStuff}
                            />

                            <h5 className="search-name">
                                {user.first} {user.last}
                            </h5>
                        </Link>
                    </div>
                ))}
                <h3>Are you looking for someone in particular?</h3>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    name="find_people"
                    placeholder="Enter name"
                    type="text"
                />
            </div>
        </>
    );
}

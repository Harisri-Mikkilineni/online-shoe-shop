import { useEffect, useState } from "react";

export default function FindPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log("FindPeople just mounted");
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
            fetch(`/users/${search}`)
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

    return (
        <>
            <h1>Blue</h1>
            <div>Are you looking for someone in particular?</div>
            <input
                onChange={(e) => setSearch(e.target.value)}
                name="find_people"
                placeholder="Enter name"
                type="text"
            />
            <span>
                {users.map((user) => (
                    <div className="search-results" key={user.id}>
                        <img className="search-pic" src={user.image_url} />
                        <h3 className="search-name">
                            {user.first} {user.last}
                        </h3>
                    </div>
                ))}
            </span>
        </>
    );
}

import { useEffect } from "react";
import { useParams, useHistory } from "react-router";

export default function OtherProfile() {
    const { id } = useParams();
    const history = useHistory();

    console.log("id:", id);

    useEffect(() => {
        fetch("/someurl")
            .then()
            .then(() => {
                history.replace("/");
            })
            .catch();
        //make some kind of request to some kind of place
    }, [id]);
    return <div>Other Profile</div>;
}

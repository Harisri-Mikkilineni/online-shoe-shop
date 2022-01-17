import { useState } from "react";

export default function useFormSubmit() {
    const [error, setError] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        });
    };

    return [submit, error];
}

//const [submit, error] = useFormSubmit("/login", userInput);

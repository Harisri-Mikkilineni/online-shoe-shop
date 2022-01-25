import { useSelector } from "react-redux";
import { useRef } from "react";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chat);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value:", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <div className="chat-container">
                <h1>This is a chat message</h1>
            </div>
            <textarea ref=textareaRef
        </>
    );
}

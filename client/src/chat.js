import { useSelector } from "react-redux";
import {useEffect, useRef } from 
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => {
        console.log("state:",state);
        return state && state.chatMessages;

    } );

     const chatContainerRef = useRef();

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value:", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <div className="chat-container" ref={chatContainerRef}>
                <h1>This is a chat message</h1>
            </div>
            <textarea rows="4" columns= "55" placeholder= "Enter your message!" onKeyDown={keyCheck} />
        </>
    );
}

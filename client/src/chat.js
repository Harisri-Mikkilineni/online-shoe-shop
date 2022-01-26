import { useSelector } from "react-redux";
import { useRef } from "react";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => {
        return state && state.chatMessages;
    });
    // const textareaRef = useRef();
    const chatContainerRef = useRef();

    // useEffect(() => {
    //     chatContainerRef.current.scrollTop =
    //         chatContainerRef.current.scrollHeight;
    // }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newChatMessage", e.target.value);
            console.log("e.target.value:", e.target.value);
            e.target.value = "";
        }
    };

    console.log("These are my chatMessages:", chatMessages);
    return (
        <>
            <h1>Chat group for you!</h1>
            <div className="chat-container" ref={chatContainerRef}>
                {chatMessages &&
                    chatMessages.map((msgs) => {
                        return (
                            <div key={msgs.id} className="messages">
                                <img
                                    className="chat_image"
                                    src={msgs.image_url}
                                />

                                <p className="msg_color">
                                    {msgs.first} {msgs.last} {msgs.created_at}
                                </p>
                                <br />
                                <div>{msgs.message}</div>
                            </div>
                        );
                    })}

                <textarea
                    rows="4"
                    columns="100"
                    placeholder="Enter your message!"
                    onKeyDown={keyCheck}
                />
            </div>
        </>
    );
}

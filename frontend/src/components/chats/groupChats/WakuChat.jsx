import React, { useEffect, useState } from 'react'
import { useWaku, useLightPush, useFilterMessages } from "@waku/react";
import { createEncoder, createDecoder } from "@waku/sdk";
import protobuf from 'protobufjs';

const WakuChat = () => {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Update the inputMessage state as the user input changes
    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    // Create and start a Light Node
    const { node, error, isLoading } = useWaku();

    // Create a message encoder and decoder
    const contentTopic = "/waku-react-guide/1/chat/proto";
    const encoder = createEncoder({ contentTopic });
    const decoder = createDecoder(contentTopic);

    // Create a message structure using Protobuf
    const ChatMessage = new protobuf.Type("ChatMessage")
        .add(new protobuf.Field("timestamp", 1, "uint64"))
        .add(new protobuf.Field("message", 2, "string"));

    // Bind push method to a node and encoder
    const lightPush = useLightPush({ node, encoder });
    const push = lightPush?.push; // Access push method if lightPush is defined


    const sendMessage = async () => {
        if (!push || inputMessage.length === 0) return;

        // Create a new message object
        const timestamp = Date.now();
        const protoMessage = ChatMessage.create({
            timestamp: timestamp,
            message: inputMessage
        });

        // Serialise the message and push to the network
        const payload = ChatMessage.encode(protoMessage).finish();
        const { recipients, errors } = await push({ payload, timestamp });

        // Check for errors
        if (errors.length === 0) {
            setInputMessage("");
            console.log("MESSAGE PUSHED");
        } else {
            console.log(errors);
        }
    };

    // Receive messages from Filter subscription
    const { messages: filterMessages } = useFilterMessages({ node, decoder });

    // Render the list of messages
    useEffect(() => {
        setMessages(filterMessages.map((wakuMessage) => {
            if (!wakuMessage.payload) return;
            return ChatMessage.decode(wakuMessage.payload);
        }));
    }, [filterMessages]);

    return (
        <>
            <div className="chat-interface">
                <h1 className='text-white'>Community</h1>
                <h1 className='text-white'>Community</h1>
                <div className="chat-body">
                    {messages.map((message, index) => (
                        <div key={index} className="chat-message">
                            <span>{new Date(message.timestamp).toUTCString()}</span>
                            <div className="message-text">{message.message}</div>
                        </div>
                    ))}
                </div>
                <div className="chat-footer">
                    <input
                        type="text"
                        id="message-input"
                        value={inputMessage}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                    />
                    <button className="send-button" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    )
}

export default WakuChat

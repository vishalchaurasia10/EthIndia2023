import React, { useEffect, useState } from 'react'
import { useWaku, useLightPush, useFilterMessages } from "@waku/react";
import { createEncoder, createDecoder } from "@waku/sdk";
import protobuf from 'protobufjs';
import toast, { Toaster } from 'react-hot-toast';

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
    const contentTopic = "/waku-react-guide/2/chat/proto";
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
        try {
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
            if (errors.length === 0) {
                setInputMessage("");
                toast.success("Message sent!");
            } else {
                toast.error(errors[0]);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Receive messages from Filter subscription
    const { messages: filterMessages } = useFilterMessages({ node, decoder });

    // Render the list of messages
    useEffect(() => {
        setMessages(filterMessages.map((wakuMessage) => {
            if (!wakuMessage.payload) return;
            console.log(wakuMessage.payload);
            return ChatMessage.decode(wakuMessage.payload);
        }));
    }, [filterMessages]);

    return (
        <>
            <Toaster />
            <div className="chat-interface">
                <h1 className='text-white font-jost text-4xl font-bold p-4'>Community</h1>
                <div className="chat-body">
                    {messages.map((message, index) => (
                        <div key={index} className="chat-message">
                            <span className='text-white'>{new Date(message.timestamp).toUTCString()}</span>
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
                    <button className="btn" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    )
}

export default WakuChat

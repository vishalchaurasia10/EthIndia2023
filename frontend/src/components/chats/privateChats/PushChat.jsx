import React, { useEffect, useState } from 'react';
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
// import { ChatView, ChatUIProvider, darkChatTheme } from "@pushprotocol/uiweb";

const PushChat = () => {
    const [userAlice, setUserAlice] = useState(null);

    const connectWallet = async () => {
        try {
            const signer = await getConnectedSigner(); // Implement a function to get the connected signer
            const user = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
            setUserAlice(user);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const getConnectedSigner = async () => {
        // Implement your logic to connect to the user's wallet.
        // This could involve using MetaMask, a custom wallet provider, or any other method.
        // For simplicity, let's assume MetaMask is available and injects 'window.ethereum'.

        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            return signer;
        } else {
            throw new Error("MetaMask not detected. Please install MetaMask or use another wallet provider.");
        }
    };

    const sendMessage = async () => {
        try {
            if (!userAlice) {
                console.error("User not initialized. Please connect your wallet first.");
                return;
            }

            // This will be the wallet address of the recipient
            const toWalletAddress = '0x4F43e17Bf872C213A39DE141Cda145BaA38245F3';

            // Send a message to Bob
            const aliceMessagesBob = await userAlice.chat.send(toWalletAddress, {
                content: "Hello Bob!",
                type: "Text",
            });

            console.log("Message sent:", aliceMessagesBob);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const fetchChats = async () => {
        try {
            if (!userAlice) {
                console.error("User not initialized. Please connect your wallet first.");
                return;
            }

            // Fetch all chats
            const aliceChats = await userAlice.chat.list("CHATS");

            console.log("Chats:", aliceChats);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    }

    return (
        <div>
            <button className='bg-white' onClick={connectWallet}>
                Connect Wallet
            </button>
            <button className='bg-white' onClick={sendMessage} disabled={!userAlice}>
                Send
            </button>
            <button className='bg-white' onClick={fetchChats} disabled={!userAlice}>
                Fetch
            </button>
            <h2>
                Live chat with pushai.eth, connect your wallet and chat to get sassy
                response from PushAI.eth
            </h2>
            <div style={{ height: "75vh", margin: "20px auto" }}>
                {/* <ChatUIProvider theme={darkChatTheme}>
                    <ChatView
                        chatId="b8e068e02fe12d7136bc2f24408835573f30c6fbf0b65ea26ab4c7055a2c85f1"
                        limit={10}
                        isConnected={true}
                        verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
                    />
                </ChatUIProvider> */}
            </div>
        </div>
    );
};

export default PushChat;
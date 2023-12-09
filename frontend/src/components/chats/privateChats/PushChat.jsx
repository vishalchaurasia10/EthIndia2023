import React, { useContext, useEffect, useState } from 'react';
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import accountContext from '@/context/account/accountContext';
import providerContext from '@/context/provider/providerContext';
import { IoMdSend } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

const PushChat = () => {
    const [userAlice, setUserAlice] = useState(null);
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const { account, setAccount } = useContext(accountContext);
    const { provider, setProvider } = useContext(providerContext)
    const [recipientAddress, setRecipientAddress] = useState('')

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const connectWallet = async () => {
        try {
            const signer = await getConnectedSigner(); // Implement a function to get the connected signer
            const user = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
            setUserAlice(user);
        } catch (error) {
            toast.error(error)
            console.error("Error connecting wallet:", error);
        }
    };

    const getConnectedSigner = async () => {

        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            setProvider(provider)
            return signer;
        } else {
            throw new Error("MetaMask not detected. Please install MetaMask or use another wallet provider.");
        }
    };

    const sendMessage = async () => {
        if (message.length === 0) {
            toast.error('Message likh de bro')
            return
        }
        try {
            if (!userAlice) {
                toast.error('User not initialized. Please connect your wallet first.')
                return;
            }

            // This will be the wallet address of the recipient
            const toWalletAddress = recipientAddress;

            // Send a message to Bob
            const aliceMessagesBob = await userAlice.chat.send(toWalletAddress, {
                content: message,
                type: "Text",
            });

            toast.success("Message sent:")
            setMessage('')
        } catch (error) {
            toast.error(error)
            console.error("Error sending message:", error);
        } finally {
            fetchChats()
        }
    };

    const fetchChats = async () => {
        try {
            if (!userAlice) {
                toast.error('User not initialized. Please connect your wallet first.')
                return;
            }

            // Fetch all chats
            const aliceChats = await userAlice.chat.list("CHATS");
            setAllMessages(aliceChats.reverse())

        } catch (error) {
            toast.error(error)
            console.error("Error fetching chats:", error);
        }
    }

    return (
        <>
            <Toaster />
            <div className='flex space-x-1 font-jost'>
                <div className="sidebarx w-1/4 m-4 p-4 h-[95vh] flex flex-col space-y-4 border border-white">
                    {account === "" && <button onClick={connectWallet} className='btn m-4'>Connect To Wallet</button>}
                    <input
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        className='w-full text-white rounded-md px-4 py-4 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="text"
                        name='recipientAddress'
                        id='recipientAddress'
                        placeholder='Enter Receipent Address'
                        value={recipientAddress}
                    />
                    <button onClick={() => { toast.success('Recipient Address set'), fetchChats() }} className='btn'>Set Recipient Address </button>
                </div>
                <div className="chats w-3/4 h-[95vh] flex flex-col border m-4 mr-8 p-4 border-white">
                    <h1 className='text-5xl font-jost font-bold text-white ' >Private Chat</h1>
                    <div className="chatssection w-full pt-32">
                        {
                            allMessages.map((message, index) => {
                                return (
                                    (message.msg.fromDID).includes(account) ?
                                        <div key={index} className="chat chat-end">
                                            <div className="chat-bubble">{message.msg.messageContent}</div>
                                        </div> :
                                        <div key={index} className="chat chat-start">
                                            <div className="chat-bubble">{message.msg.messageContent}</div>
                                        </div>

                                )
                            })
                        }
                    </div>
                    <input
                        onChange={handleChange}
                        className='w-[90%] text-white fixed bottom-10 rounded-md px-4 py-4 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="text"
                        name='message'
                        id='message'
                        placeholder='Enter Message'
                        value={message}
                    />
                    <button className='flex btn items-center fixed bottom-[2.75rem] right-4'>
                        <IoMdSend onClick={sendMessage} className='w-8 h-8 text-pink-500' />
                    </button>
                </div>
            </div>
        </>
    );
};

export default PushChat;
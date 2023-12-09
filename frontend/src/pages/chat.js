import React, { useEffect, useState } from 'react';
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import PushChat from '@/components/chats/privateChats/PushChat';

const Chat = () => {
    return (
        <div>
            <PushChat />
            {/* <button className='bg-white' onClick={connectWallet}>
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
            </h2> */}
        </div>
    );
};

export default Chat;
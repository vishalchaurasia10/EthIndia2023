import React from 'react';
import PushChat from '@/components/chats/privateChats/PushChat';
import Transition from '@/components/layout/Transition';

const Chat = () => {
    return (
        <>
            <Transition />
            <div>
                <PushChat />
            </div>
        </>
    );
};

export default Chat;
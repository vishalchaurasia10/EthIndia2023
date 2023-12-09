import React from 'react';
import { SafeAuthPack, SafeAuthConfig, SafeAuthInitOptions } from "@safe-global/auth-kit";

const Authentication = () => {
    const safeAuthInitOptions = {
        showWidgetButton: false, // Set to true to show the SafeAuth widget button
        chainConfig: {
            blockExplorerUrl: "https://etherscan.io", // The block explorer URL
            chainId: "0x5", // The chain ID
            displayName: "Ethereum Goerli", // The chain name
            rpcTarget: "https://rpc.ankr.com/eth_goerli", // The RPC target
            ticker: "ETH", // The chain ticker
            tickerName: "Ethereum", // The chain ticker name
        },
    };

    const safeAuthPack = new SafeAuthPack();

    const login = async () => {
        await safeAuthPack.init(safeAuthInitOptions); // Moved init inside login
        const safeAuthSignInResponse = await safeAuthPack.signIn();
        console.log(safeAuthSignInResponse);
        // Handle the response or perform other actions after signing in
    };

    return (
        <div>
            <button className="btn btn-active" onClick={login}>
                Sign In
            </button>
        </div>
    );
};

export default Authentication;
import { ethers } from "ethers";

export const connectWallet = async () => {
    // 1. Check for Provider
    if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install MetaMask.");
    }

    try {
        // 2. Initialize Provider (ethers v5 syntax preserved)
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // 3. Request Account Access
        await provider.send("eth_requestAccounts", []);
        
        // 4. Initialize Signer
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();

        // ── Your original return — untouched, with network data added ──
        return { 
            provider, 
            signer, 
            address, 
            chainId: network.chainId 
        };
    } catch (error) {
        console.error("Wallet Connection Error:", error);
        throw error;
    }
};

/**
 * Helper to check if the user is on the correct network
 * (e.g., 1 for Ethereum Mainnet, 137 for Polygon)
 */
export const checkNetwork = async (provider, requiredChainId) => {
    const network = await provider.getNetwork();
    return network.chainId === requiredChainId;
};

import { ethers } from "ethers";

export const connectWallet = async () => {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return { provider, signer, address: await signer.getAddress() };
};

import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getMetamask = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return { provider, signer };
};

// import { ContractTransaction, Contract } from "ethers";
// import { contractAbi, contractAddress } from "./constants";
import { BrowserProvider, Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

export const createEthereumContract = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  //   const transactionsContract = new Contract(
  //     contractAddress,
  //     contractAbi,
  //     signer
  //   );

  return { provider, signer };
};

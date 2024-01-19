"use client";
import {
  ErrorMessage,
  contractAbi,
  contractAddress,
} from "@/utils/constants/constants";
import { getMetamask } from "@/utils/getMetamask/getMetamask";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

type IdeaType = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
};

export const useFetchidea = () => {
  const [currAccount, setCurrAccount] = useState("");
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.default);
  const [ideas, setIdeas] = useState<IdeaType[]>([]);

  const [startIndex, setStartIndex] = useState(0);
  const [maxPages] = useState(1);

  const [isLoading, setIsLoading]=useState(false)
console.log(isLoading);

  const onloadMore = () => {
    setStartIndex((p) => p + maxPages);
  };
  const onFetch = async (address: string) => {
    try {
      if (!window.ethereum) {
        setError(ErrorMessage.MetamaskNotInstalled);
        return;
      }

      const { signer } = await getMetamask();

      const contract = new Contract(contractAddress, contractAbi, signer);

      if (startIndex !== undefined && maxPages !== undefined) {
        setIsLoading(true)
        const ideas = await contract.getIdeasByAddress(
          address,
          startIndex,
          maxPages
        );

        const formattedIdeas = ideas.map((transaction: never) => ({
          id: transaction[0],
          title: transaction[1],
          content: transaction[2],
          timestamp: new Date(parseInt(transaction[3])).toLocaleString(),
        }));
        console.log(ideas.length);

        setIdeas((prevIdeas) => [
          ...prevIdeas,
          ...formattedIdeas.filter(
            (newIdea: any) => !prevIdeas.some((idea) => idea.id === newIdea.id)
          ),
        ]);
        setIsLoading(false)

      }
    } catch (error: any) {
      if (error.message.includes("user rejected action")) {
        setError(ErrorMessage.AccessToMetamaskWasDenied);
      } else {
        setError(ErrorMessage.GeneralError);
        console.error("Transaction failed:", error);
      }
    }
  };

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) {
        setError(ErrorMessage.MetamaskNotInstalled);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts) {
        setCurrAccount(accounts[0]);
        onFetch(accounts[0]);

        setError(ErrorMessage.default);
      } else {
        setError(ErrorMessage.NoAccoutFound);
        console.log("No accounts found");
      }
    } catch (error: any) {
      if (error.message.includes("could not coalesce error")) {
        setError(ErrorMessage.PleaseAcceptMetamaskRequest);
      } else if (error.message.includes("user rejected action")) {
        setError(ErrorMessage.AccessToMetamaskWasDenied);
      } else {
        setError(ErrorMessage.GeneralError);
      }
    }
  };

  const resetErrMessage = () => setError(ErrorMessage.default);

  useEffect(() => {
    checkWalletConnection();
  }, [maxPages, startIndex]);

  return {
    error,
    currAccount,
    resetErrMessage,
    ideas,
    onloadMore,
    isLoading
  };
};

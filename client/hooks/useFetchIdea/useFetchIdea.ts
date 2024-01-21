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
  const [maxPages] = useState(10);

  const [ideaslength, setIdeaslength] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

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
        const ideaslength = await contract.getIdeasByAddress(
          address,
          startIndex,
          99999
        );
        setIdeaslength(ideaslength.length);
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

        setIdeas((prevIdeas) => [
          ...prevIdeas,
          ...formattedIdeas.filter(
            (newIdea: any) => !prevIdeas.some((idea) => idea.id === newIdea.id)
          ),
        ]);
      }
    } catch (error: any) {
      if (error.message.includes("user rejected action")) {
        setError(ErrorMessage.AccessToMetamaskWasDenied);
        setIsLoading(false);
      } else if (error.message.includes("eth_requestAccounts")) {
        setError(ErrorMessage.PendingMetamaskAuthorization);
        setIsLoading(false);
      } else {
        setError(ErrorMessage.GeneralError);
        console.error("Transaction failed:", error);
        setIsLoading(false);
      }
    }
  };

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) {
        setError(ErrorMessage.MetamaskNotInstalled);
        return;
      }

      setIsLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setCurrAccount(accounts[0]);
        onFetch(accounts[0]);
        setError(ErrorMessage.default);
        setIsLoading(false);
      } else {
        setError(ErrorMessage.NoAccoutFound);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);

      if (error.code === 4001) {
        // User rejected the request
        setError(ErrorMessage.AccessToMetamaskWasDenied);
      } else {
        setError(ErrorMessage.GeneralError);
        console.error("An error occurred: ", error);
      }
    }
  };

  const resetErrMessage = () => setError(ErrorMessage.default);

  useEffect(() => {
    checkWalletConnection();
  }, [maxPages, startIndex]);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setCurrAccount(accounts[0]);
      onFetch(accounts[0]);
    } else {
      setCurrAccount("");
      setError(ErrorMessage.NoAccoutFound);
      setIdeas([]);
    }
  };

  useEffect(() => {
    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [startIndex, maxPages]);

  return {
    error,
    currAccount,
    resetErrMessage,
    ideas,
    onloadMore,
    isLoading,
    isDisabled: ideas.length >= ideaslength,
    checkWalletConnection,
    setError,
  };
};

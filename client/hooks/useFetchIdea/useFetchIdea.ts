"use client";
import {
  ErrorMessage,
  contractAbi,
  contractAddress,
} from "@/utils/constants/constants";
import { getMetamask } from "@/utils/getMetamask/getMetamask";
import { Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";

type IdeaType = {
  title: string;
  content: string;
  timestamp: string;
};

const startIndex = 0;
// if biger than the array size it defaults to array size
const maxPages = 1;

export const useFetchidea = () => {
  const [currAccount, setCurrAccount] = useState("");
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.default);
  const [ideas, setIdeas] = useState<IdeaType[]>([]);

  const onFetch = async (address: string) => {
    try {
      if (!window.ethereum) {
        setError(ErrorMessage.MetamaskNotInstalled);
        return;
      }

      const { signer } = await getMetamask();

      const contract = new Contract(contractAddress, contractAbi, signer);

      const ideas = await contract.getIdeasByAddress(
        address,
        startIndex,
        maxPages
      );

      const formattedIdeas = ideas.map((transaction: never) => {
        return {
          title: transaction[0],
          content: transaction[1],
          timestamp: new Date(parseInt(transaction[2])).toLocaleString(),
        };
      });
      setIdeas(formattedIdeas);
    } catch (error: any) {
      if (error.message.includes("user rejected action")) {
        setError(ErrorMessage.AccessToMetamaskWasDenied);
      } else {
        setError(ErrorMessage.GeneralError);
        console.error("Transaction failed:", error);
      }
    }
  };

  const checkWalletConnection = useCallback(async () => {
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
  }, []);

  const resetErrMessage = () => setError(ErrorMessage.default);

  useEffect(() => {
    checkWalletConnection();
  }, [checkWalletConnection]);

  return {
    error,
    currAccount,
    resetErrMessage,
    ideas,
  };
};
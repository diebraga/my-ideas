"use client";
import {
  ErrorMessage,
  contractAbi,
  contractAddress,
} from "@/utils/constants/constants";
import { getMetamask } from "@/utils/getMetamask/getMetamask";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchidea } from "../useFetchIdea/useFetchIdea";

type FormData = {
  title: string;
  idea: string;
  // isPrivate: boolean;
};

export const useShareidea = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<FormData>();
  const {
    currAccount,
    error,
    setError,
    resetErrMessage,
    checkWalletConnection,
    isLoading: isPending,
  } = useFetchidea();
  const [txHash, setTxHash] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      if (!window.ethereum) {
        setError(ErrorMessage.MetamaskNotInstalled);
        return;
      }

      const { idea, title } = data;
      const { signer } = await getMetamask();

      const contract = new Contract(contractAddress, contractAbi, signer);

      const transactionHash = await contract.addIdea(title, idea, Date.now());
      await transactionHash.wait();

      reset({ idea: "", title: "" });
      setTxHash(transactionHash.hash);
    } catch (error: any) {
      if (error.message.includes("user rejected action")) {
        setError(ErrorMessage.AccessToMetamaskWasDenied);
      } else {
        setError(ErrorMessage.GeneralError);
        console.error("Transaction failed:", error);
      }
    }
  };

  const resetTxHash = () => setTxHash("");

  return {
    register,
    handleSubmit,
    errors,
    error,
    currAccount,
    onSubmit,
    isLoading: isLoading || isSubmitting,
    resetErrMessage,
    txHash,
    resetTxHash,
    checkWalletConnection,
    isPending,
  };
};

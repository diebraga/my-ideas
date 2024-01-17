"use client";
import { getMetamask } from "@/utils/getMetamask/getMetamask";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  idea: string;
  // isPrivate: boolean;
};

export enum ErrorMessage {
  default = "",
  MetamaskNotInstalled = "Please install metamask",
  PleaseAcceptMetamaskRequest = "Please accept request on metamask",
  AccessToMetamaskWasDenied = "Access to metamask was denied",
  GeneralError = "An unespected error has ocurred",
  NoAccoutFound = "No account found",
}

export const useShareidea = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<FormData>();
  const [currAccount, setCurrAccount] = useState("");
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.default);

  const onSubmit = async (data: FormData) => {
    try {
      if (!window.ethereum) {
        setError(ErrorMessage.MetamaskNotInstalled);
        return;
      }

      const { idea, title } = data;
      const { signer } = await getMetamask();

      const response = await fetch("/api/createIdea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          idea,
          signer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit idea");
      }

      reset({ idea: "", title: "" });

      const responseData = await response.json();
      console.log("API response:", responseData);
    } catch (error) {
      setError(ErrorMessage.GeneralError);
      console.error("Transaction failed:", error);
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
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    error,
    currAccount,
    onSubmit,
    isLoading: isLoading || isSubmitting,
    resetErrMessage,
  };
};
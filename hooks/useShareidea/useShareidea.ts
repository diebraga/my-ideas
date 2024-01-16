"use client";
import { getMetamask } from "@/utils/createEthContract/createEthContract";
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
    formState: { errors, isLoading },
  } = useForm<FormData>();
  const [currAccount, setCurrAccount] = useState("");
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.default);
  console.log({ currAccount });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset({ idea: "", title: "" });
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
    isLoading,
    resetErrMessage,
  };
};

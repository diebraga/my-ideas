"use client";
import { createEthereumContract } from "@/utils/createEthContract/createEthContract";
import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertType } from "../Alert/Alert";
import { AiOutlineExclamationCircle } from "react-icons/ai";

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
}

const ShareIdeaForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<FormData>();
  const [currAccount, setCurrAccount] = useState("");
  const [currNetwork, setCurrNetwork] = useState("");
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.default);
  console.log({ currNetwork, currAccount });

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

      const { provider } = await createEthereumContract();
      const network = await provider.getNetwork();

      setCurrNetwork(network.name);
      if (accounts) {
        setCurrAccount(accounts[0]);
      } else {
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

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-2 flex flex-col ">
      <h1 className="text-xl font-semibold mb-2">Share your idea ✨</h1>
      <Input
        crossOrigin={undefined}
        {...register("title", {
          required: "Title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters long",
          },
        })}
        label="Title"
        error={!!errors.title}
      />
      <div className="text-red-500 text-sm my-2">
        {errors.title && errors.title.message}
      </div>
      <Textarea
        label="Share your idea..."
        {...register("idea", {
          required: "Idea is required",
          minLength: {
            value: 3,
            message: "Your idea must be at least 3 characters long",
          },
        })}
        error={!!errors.idea}
        size="lg"
      />
      <div className="text-red-500 text-sm my-1">
        {errors.idea && errors.idea.message}
      </div>

      <Button type="submit" className="w-full" loading={isLoading}>
        Share
      </Button>
      {error && (
        <Alert
          type={AlertType.Danger}
          isVisible
          content={error}
          onClose={() => setError(ErrorMessage.default)}
          icon={<AiOutlineExclamationCircle />}
        />
      )}
      {/* <Checkbox
        label="Idea is private"
        crossOrigin={undefined}
        className="mt-0.5"
        {...register("isPrivate")}
      /> */}
    </form>
  );
};

export default ShareIdeaForm;

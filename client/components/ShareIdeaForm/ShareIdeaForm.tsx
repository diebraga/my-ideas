"use client";
import { Button } from "@material-tailwind/react";
import React from "react";
import { Alert, AlertType } from "../Alert/Alert";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useShareidea } from "@/hooks/useShareidea/useShareidea";
import { CopyToClipboardButton } from "../CopyToClipboardButton/CopyToClipboardButton";

const ShareIdeaForm: React.FC = () => {
  const {
    error,
    errors,
    handleSubmit,
    isLoading,
    onSubmit,
    register,
    resetErrMessage,
    txHash,
    resetTxHash,
  } = useShareidea();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-2 flex flex-col mt-3">
      <h1 className="text-2xl md:text-3xl mb-3">Share your idea ✨</h1>
      <input
        placeholder="Title"
        {...register("title", {
          required: "Title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters long",
          },
        })}
        className={`peer h-full w-full rounded-md border border-gray-300 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
      />
      <div className="text-red-500 text-sm my-2">
        {errors.title && errors.title.message}
      </div>
      <textarea
        id="idea"
        placeholder="Share what's your idea..."
        {...register("idea", {
          required: "Idea is required",
          minLength: {
            value: 3,
            message: "Your idea must be at least 3 characters long",
          },
        })}
        className={`peer h-full w-full rounded-md border border-gray-300 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
        rows={4}
      />
      <div className="text-red-500 text-sm my-2">
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
          onClose={resetErrMessage}
          icon={<AiOutlineExclamationCircle />}
        />
      )}
      {txHash && (
        <Alert
          type={AlertType.Success}
          isVisible
          content={txHash}
          onClose={resetTxHash}
          icon={<CopyToClipboardButton content={txHash} />}
          title="Success"
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

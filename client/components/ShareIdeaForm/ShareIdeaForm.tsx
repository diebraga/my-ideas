"use client";
import { Button, Input, Textarea } from "@material-tailwind/react";
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-2 flex flex-col mt-32"
    >
      <h1 className="text-xl font-semibold mb-3 md:text-2xl">
        Share your idea ✨
      </h1>
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

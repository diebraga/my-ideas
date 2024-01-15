"use client";
import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  idea: string;
};

const ShareIdeaForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset({ idea: "", title: "" });
  };

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
    </form>
  );
};

export default ShareIdeaForm;

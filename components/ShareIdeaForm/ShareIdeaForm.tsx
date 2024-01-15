"use client";
import { Input } from "@material-tailwind/react";
import React from "react";
import { TextEditor } from "../TextEditor/TextEditor";

const ShareIdeaForm: React.FC = () => {
  return (
    <div>
      <h1 className="mb-2">Share your idea</h1>
      <Input label="Title" crossOrigin={undefined} />
      <TextEditor />
    </div>
  );
};

export default ShareIdeaForm;

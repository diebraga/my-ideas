import React from "react";
import { MdOutlineContentCopy } from "react-icons/md";

const CopyToClipboardButton: React.FC<{ content: string }> = ({ content }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <MdOutlineContentCopy
      onClick={copyToClipboard}
      className="cursor-pointer"
    />
  );
};

export { CopyToClipboardButton };

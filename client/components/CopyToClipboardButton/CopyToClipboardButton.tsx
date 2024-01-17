import React, { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

const CopyToClipboardButton: React.FC<{ content: string }> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative inline-block">
      <MdOutlineContentCopy
        onClick={copyToClipboard}
        className="cursor-pointer text-xl"
      />
      {isCopied && (
        <div className="tooltip absolute z-10 w-auto p-2 -mt-10 text-white bg-black rounded shadow-lg text-xs">
          Copied!
          <div className="tooltip-arrow absolute left-1/2 transform -translate-x-1/2 -bottom-1 mt-1 w-0 h-0 border-l-transparent border-r-transparent border-t-black border-solid border-width-4"></div>
        </div>
      )}
    </div>
  );
};

export { CopyToClipboardButton };

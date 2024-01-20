"use client";
import { useFetchidea } from "@/hooks/useFetchIdea/useFetchIdea";
import { truncateString } from "@/utils/truncateString/truncateString";
import { Button, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { VscEmptyWindow } from "react-icons/vsc";
import { Alert, AlertType } from "../Alert/Alert";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const MyIdeas: React.FC = () => {
  const {
    ideas,
    onloadMore,
    isLoading,
    error,
    isDisabled,
    resetErrMessage,
    checkWalletConnection,
  } = useFetchidea();

  if (isLoading) {
    return (
      <div className="flex flex-col mt-16 p-4 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Alert
          className="mt-14"
          type={AlertType.Danger}
          isVisible
          content={error}
          icon={<AiOutlineExclamationCircle />}
        />
        {isLoading && (
          <div className="flex flex-col mt-16 p-4 items-center justify-center">
            <Spinner />
          </div>
        )}
        <Button
          className="w-full mt-4"
          onClick={() => {
            checkWalletConnection(), resetErrMessage();
          }}
        >
          Connect
        </Button>
      </>
    );
  }
  return (
    <div className="flex flex-col mt-16 p-4 items-center justify-center">
      {ideas.length > 0 ? (
        // Show the ideas list if there are any ideas and isLoading is false
        <>
          {ideas.map(({ id, title, content }) => (
            <Link
              key={id}
              href={`/${id}`}
              className="mb-4 p-4 bg-gray-100 rounded shadow cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <p>{truncateString(content, 90)}</p>
            </Link>
          ))}
          <Button onClick={onloadMore} disabled={isDisabled}>
            Load more
          </Button>
        </>
      ) : (
        // Show the message about having no ideas if there are no ideas and isLoading is false
        <div className="flex flex-col text-center text-xs md:text-2xl items-center">
          <VscEmptyWindow className="text-2xl mb-2 md:text-3xl" />
          <p>You have no ideas stored in the blockchain</p>
          <Link
            href="/"
            className="text-light-blue-700 hover:underline mt-1 cursor-pointer"
          >
            Share your idea
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyIdeas;

"use client";
import { useFetchidea } from "@/hooks/useFetchIdea/useFetchIdea";
import { truncateString } from "@/utils/truncateString/truncateString";
import Link from "next/link";
import React from "react";
import { VscEmptyWindow } from "react-icons/vsc";

const MyIdeas: React.FC = () => {
  const { ideas, onloadMore } = useFetchidea();

  return (
    <div className="flex flex-col mt-16 p-4 items-center justify-center">
      {ideas.length < 1 ? (
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
      ) : (
        <>
          {ideas.map(({ title, content }, index) => (
            <Link
              key={index}
              href={`/${index}`}
              className="mb-4 p-4 bg-gray-100 rounded shadow  cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <p>{truncateString(content, 90)}</p>
            </Link>
          ))}
          <button onClick={onloadMore}>onloadMore</button>
        </>
      )}
    </div>
  );
};

export default MyIdeas;

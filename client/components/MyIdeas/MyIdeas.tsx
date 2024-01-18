"use client";
import { useFetchidea } from "@/hooks/useFetchIdea/useFetchIdea";
import { truncateString } from "@/utils/truncateString/truncateString";
import Link from "next/link";
import React from "react";

const MyIdeas: React.FC = () => {
  const { ideas } = useFetchidea();
  return (
    <div className="flex flex-col mt-16 p-3 cursor-pointer">
      {ideas.map(({ title, content }, index) => (
        <Link
          key={index}
          href={`/${index}`}
          className="mb-4 p-4 bg-gray-100 rounded shadow"
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <p>{truncateString(content, 90)}</p>
        </Link>
      ))}
    </div>
  );
};

export default MyIdeas;

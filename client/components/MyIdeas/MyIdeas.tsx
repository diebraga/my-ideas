import { truncateString } from "@/utils/truncateString/truncateString";
import Link from "next/link";
import React from "react";

const mockIdeas = Array.from({ length: 50 }, (_, i) => ({
  title: `Idea ${i + 1}`,
  content: `Content for idea ${i + 1} - ${"Content for idea".repeat(90)}`,
}));

const MyIdeas: React.FC = () => {
  return (
    <div className="flex flex-col mt-16 p-3 cursor-pointer">
      {mockIdeas.map((idea, index) => (
        <Link
          key={index}
          href={`/${index}`}
          className="mb-4 p-4 bg-gray-100 rounded shadow"
        >
          <h2 className="text-lg font-semibold">{idea.title}</h2>
          <p>{truncateString(idea.content, 90)}</p>
        </Link>
      ))}
    </div>
  );
};

export default MyIdeas;

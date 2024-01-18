"use client";

import useIdeaStore from "@/hooks/useIdeaStore/useIdeaStore";

const MyIdea = () => {
  const { idea } = useIdeaStore((state) => state);
  console.log(idea);

  return (
    <div className="flex flex-col mt-8 p-3 justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl">My First Idea</h1>
        <p>
          {
            "This is my first idea and I'm very happy to post it in the blockchain"
          }
        </p>
      </div>
      <p className="text-sm absolute inset-x-0 bottom-0 p-3">
        17/01/2024, 14:14:44
      </p>
    </div>
  );
};

export default MyIdea;

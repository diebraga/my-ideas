"use client";

import useIdeaStore from "@/hooks/useIdeaStore/useIdeaStore";

const MyIdea = () => {
  const { idea } = useIdeaStore((state) => state);
  console.log(idea);

  return (
    <main>
      <h1>{idea.title}</h1>
      <p>{idea.content}</p>
      <p>{idea.timestamp}</p>
    </main>
  );
};

export default MyIdea;

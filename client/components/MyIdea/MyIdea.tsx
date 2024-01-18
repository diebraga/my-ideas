"use client";
import { useFetchidea } from "@/hooks/useFetchIdea/useFetchIdea";
import { usePathname } from "next/navigation";

const MyIdea = () => {
  const { ideas } = useFetchidea();
  const pathname = usePathname();
  const itemIndex = pathname.replace(/\//g, "");
  const idea = ideas[Number(itemIndex)];

  return (
    <div className="flex flex-col mt-3 p-3 justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl mt-3">{idea?.title}</h1>
        <p>{idea?.content}</p>
      </div>
      <p className="text-sm absolute inset-x-0 bottom-0 p-3">
        {idea?.timestamp}
      </p>
    </div>
  );
};

export default MyIdea;

"use client";
import { useFetchidea } from "@/hooks/useFetchIdea/useFetchIdea";
import { navigation } from "@/utils/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const MyIdea = () => {
  const { ideas } = useFetchidea();
  const pathname = usePathname();
  const itemIndex = pathname.replace(/\//g, "");
  const idea = ideas[Number(itemIndex)];

  return (
    <div
      className="flex flex-col p-7 justify-between"
      style={{ height: "calc(100vh - 97px)" }}
    >
      <div className="mt-5">
        <Link href={navigation[1].href}>
          <FaArrowLeftLong />
        </Link>
        <h1 className="text-2xl md:text-3xl mt-4">{idea?.title}</h1>
        <p>{idea?.content}</p>
      </div>
      <p className="text-sm mb-3 ">{idea?.timestamp}</p>
    </div>
  );
};

export default MyIdea;

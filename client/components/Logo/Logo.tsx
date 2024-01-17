import Link from "next/link";
import React from "react";
import { FaEthereum } from "react-icons/fa";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center cursor-pointer text-black">
      <FaEthereum className="text-lg" size={39} />
      <h1 className="text-xl font-semibold">i DApp</h1>
    </Link>
  );
};

export default Logo;

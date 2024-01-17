"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaEthereum } from "react-icons/fa";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isMyIAtive = pathname === "/" ? "font-semibold" : "";
  const isShare = pathname === "/share" ? "font-semibold" : "";
  const isAbout = pathname === "/about" ? "font-semibold" : "";

  return (
    <header className="w-full bg-transparent border-b border-gray-300 py-6">
      <div className="flex justify-center">
        <div className="flex items-center w-full max-w-2xl px-6 justify-between">
          <div className="flex items-center">
            <FaEthereum className="text-lg mr-3" size={39} />
            <h1 className="text-xl font-semibold">i DApp</h1>
          </div>
          <nav className="flex items-center">
            <Link
              href="/"
              className={`text-md md:text-lg mx-4 hover:text-blue-600 transition-colors duration-200 ease-in-out ${isMyIAtive}`}
            >
              My Ideas
            </Link>
            <Link
              href="/share"
              className={`text-md md:text-lg mx-4 hover:text-blue-600 transition-colors duration-200 ease-in-out ${isShare}`}
            >
              Share
            </Link>
            <Link
              href="/about"
              className={`text-md md:text-lg mx-4 hover:text-blue-600 transition-colors duration-200 ease-in-out ${isAbout}`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export { Header };

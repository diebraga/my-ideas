"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import Logo from "../Logo/Logo";
import { navigation } from "@/utils/constants/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-gray-300 py-6 sticky top-0 bg-white">
      <div className="flex justify-center">
        <div className="flex items-center w-full max-w-2xl px-6 justify-between">
          <Logo />
          <nav>
            <Sidebar />
          </nav>
          <nav className="items-center hidden md:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href ? "font-semibold" : "";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-md md:text-lg mx-4 hover:font-semibold transition-colors duration-200 ease-in-out ${isActive}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export { Header };

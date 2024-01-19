import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "I Dapp",
  description: "I Dap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex justify-center items-center m-0 flex-col relative">
        <Header />
        <div className="w-full max-w-2xl h-full flex flex-col">{children}</div>
      </body>
    </html>
  );
}

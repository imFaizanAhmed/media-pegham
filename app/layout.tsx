import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/ui/mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediaPegham",
  description: "Created with love by Faizan Ahmed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-center">
          <div className="flex sm:flex-row flex-col items-center justify-between mb-8 border-b border-gray-600 p-8 w-full max-w-std-width">
            <div className="text-3xl"> MediaPegham</div>
            <div className="flex items-center mt-2 sm:mt-0">
              <div className="pr-8 text-base"> Login</div>
              <ModeToggle />
            </div>
          </div>
        </div>
        {children}
        <div className="flex items-center justify-center">
          <div className="flex items-end justify-center mt-8 py-8 border-t border-gray-600 w-full max-w-std-width">
            MediaPegham © Copyright 2024.
          </div>
        </div>
      </body>
    </html>
  );
}

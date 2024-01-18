import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { RenderLogo } from "@/components/logo";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import Icon from '@/public/writingIcon-light.svg'

export const metadata: Metadata = {
  title: "MediaPegham",
  description: "Created with love by Faizan Ahmed",
  authors: [{name:'Faizan Ahmed'}],
  keywords:['post generator', "social media", "AI", "Artifical intelligence", "LinkedIn", "Twitter", "Medium" ],
  icons: Icon
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex items-center justify-center">
            <div className="flex sm:flex-row flex-col items-center justify-between mb-8 border-b border-gray-600 p-8 w-full max-w-std-width">
              <div className="flex text-3xl">
                <RenderLogo />
                MediaPegham
              </div>
              <div className="flex items-center mt-2 sm:mt-0">
                {/* <div className="pr-8 text-base"> Login</div> */}
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
        </ThemeProvider>
      </body>
    </html>
  );
}

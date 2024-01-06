"use client";

import Image from "next/image";
import { useTheme } from 'next-themes';
import WritingIconDark from "@/public/writingIcon-dark.svg";
import WritingIconLight from "@/public/writingIcon-light.svg";

export function RenderLogo() {
  const {theme} = useTheme();
  return (
    <Image
      src={theme === 'dark' ? WritingIconDark : WritingIconLight}
      width={40}
      height={40}
      alt="Logo"
    />
  );
}

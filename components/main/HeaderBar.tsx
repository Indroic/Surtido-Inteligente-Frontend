"use client";
import Image from "next/image";

import User from "./User";

import { useAppSelector } from "@/store/hooks";

export default function HeaderBar() {
  const hidden = useAppSelector((state) => state.header.hidden);

  return (
    <header
      className={`flex flex-row items-center justify-between w-full p-3 border-b-divider border-b-1 ${hidden ? "hidden" : ""}`}
    >
      <Image
        alt="logo"
        className="w-32 h-auto"
        height={0}
        sizes="100dvh"
        src={"/logo.webp"}
        width={0}
      />
      <User />
    </header>
  );
}

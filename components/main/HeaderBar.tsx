"use client";

import Image from "next/image";

import User from "./User";

import { useHeaderBar } from "@/context/HeaderBarContext";

export default function HeaderBar() {
  const { hidden } = useHeaderBar();

  return (
    <header
      className={`flex flex-row items-center justify-between w-full p-3 border-b-divider border-b-1 ${hidden ? "hidden" : ""}`}
    >
      <Image alt="logo" height={80} src={"/logo.webp"} width={120} />
      <User />
    </header>
  );
}

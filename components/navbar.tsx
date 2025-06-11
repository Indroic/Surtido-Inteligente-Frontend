"use client";

import Image from "next/image";
import { Divider } from "@heroui/divider";
import { useMemo } from "react";

import NavItem from "./navitem";

import { useNavBar } from "@/context/NavBarContext";

export default function NavBar() {
  const { items, secondaryItems } = useNavBar();

  useMemo(() => null, [items, secondaryItems]);

  return (
    <div className={"flex flex-col bg-content1 h-full w-[5.5%]"}>
      <section className="items-center justify-center p-4">
        <Image
          alt="logo"
          className="aspect-[2/2]"
          height={56}
          src={"/isotipo.png"}
          width={56}
        />
      </section>
      <Divider />

      <section className="flex-1 flex flex-col gap-3 justify-center items-center p-4 h-full">
        {items.map((item, i) => (
          <NavItem key={i} {...item} />
        ))}
      </section>

      {secondaryItems ? <Divider /> : null}

      <section>
        <ul className="flex-1 flex flex-col justify-center items-center p-4">
          <li>
            {secondaryItems?.map((item, i) => <NavItem key={i} {...item} />)}
          </li>
        </ul>
      </section>
    </div>
  );
}

"use client";
import Image from "next/image";

import { useAuthLayoutContext } from "@/context/AuthLayoutContext";
import { useAuthText } from "@/context/AuthTextLayoutCOntext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { message, subMessage } = useAuthText();
  const { hideMainText } = useAuthLayoutContext();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen min-w-screen max-w-screen">
      <section className="gap-5 flex flex-col md:w-auto md:h-[100dvh] lg:w-[70dvw] lg:max-h-min md:bg-content1 md:border-1 shadow-md border-divider px-6 flex-grow py-10 rounded-lg">
        <section className="flex flex-row">
          <Image
            alt="logo"
            className="w-12 aspect-auto"
            height={48}
            src="/isotipo.webp"
            width={48}
          />
        </section>

        <section className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 grid-flow-row  gap-5">
          {!hideMainText && (
            <section className="row-span-1 md:col-span-1">
              <h1 className="font-semibold text-3xl">{message}</h1>
              <h2 className="font-normal text-md">{subMessage}</h2>
            </section>
          )}
          <section
            className={
              hideMainText
                ? "row-span-3 md:col-span-3 md:row-span-2"
                : "row-span-2 md:col-span-2"
            }
          >
            {children}
          </section>
        </section>
      </section>
    </main>
  );
}

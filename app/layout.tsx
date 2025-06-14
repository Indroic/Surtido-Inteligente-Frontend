import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";
import clsx from "clsx";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { Providers } from "./providers";

import { defaultSiteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: defaultSiteConfig.name,
    template: `%s - ${defaultSiteConfig.name}`,
  },
  description: defaultSiteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers
          session={session as any}
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <div className="relative flex flex-col h-screen w-screen">
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

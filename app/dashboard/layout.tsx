import NavBar from "@/components/NavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col-reverse h-full w-full gap-8">
      <NavBar />
      <div className="flex flex-1 container flex-grow m-0 p-5">{children}</div>
    </main>
  );
}

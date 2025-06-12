import NavBar from "@/components/NavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-row relative h-full w-full gap-8">
      <NavBar />
      <div className="flex flex-1">{children}</div>
    </main>
  );
}

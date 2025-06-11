import NavBar from "@/components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-row h-full w-full gap-8">
      <NavBar />
      <section className="flex flex-1 w-full h-full">{children}</section>
    </main>
  );
}

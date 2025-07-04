import HeaderBar from "@/components/main/HeaderBar";
import NavBar from "@/components/main/NavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col h-full w-full gap-4">
      <HeaderBar />
      <NavBar />
      <div className="flex flex-1 flex-grow m-0 p-5">{children}</div>
    </main>
  );
}

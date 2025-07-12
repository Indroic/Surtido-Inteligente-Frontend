import BreadCrump from "@/components/main/BreadCrump";
import HeaderBar from "@/components/main/HeaderBar";
import NavBar from "@/components/main/NavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col min-h-full min-w-full max-w-full">
      <HeaderBar />
      <NavBar />
      <BreadCrump />
      <div className="flex flex-1 flex-grow m-0 p-5">{children}</div>
    </main>
  );
}

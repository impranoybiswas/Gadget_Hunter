import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

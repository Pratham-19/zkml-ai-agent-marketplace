import Sidebar from "./sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="from-background to-background/95 flex min-h-screen overflow-hidden bg-gradient-to-br">
      <Sidebar />
      <main className="ml-16 flex-1 p-8 pt-16">{children}</main>
    </div>
  );
}

// src/app/(dashboard)/layout.tsx
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Root wrapper is a horizontal Flexbox (row)
    <div className="flex h-screen overflow-hidden bg-background">
      
      {/* 2. Sidebar takes full height on the left */}
      <Sidebar />

      {/* 3. Right side column containing Header + Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header sits strictly inside the right column */}
        <Navbar />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
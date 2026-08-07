"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";

export function Navbar({
  open,
  onToggleSidebar,
}: {
  open: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <div className="border-b bg-zinc-100 h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <MobileSidebar />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <span className="font-bold text-lg">TaskFlow</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-sm">
          U
        </div>
      </div>
    </div>
  );
}

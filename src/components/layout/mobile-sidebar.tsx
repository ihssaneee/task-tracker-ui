// src/components/layout/mobile-sidebar.tsx
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-full max-w-sm bg-background">
        <div className="font-bold text-lg p-4 border-b text-primary">TaskFlow</div>

        <div className="min-h-full" onClick={() => setOpen(false)}>
          <Sidebar isMobile />
        </div>
      </SheetContent>
    </Sheet>
  );
} 
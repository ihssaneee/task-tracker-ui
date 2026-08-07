"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {Button} from "@/components/ui/button";  
import {CheckSquare, Settings} from "lucide-react";


const NAV_ITEMS = [
    {
        Label: "Tasks",
        Icon: CheckSquare,
        href: "/tasks",
    },
    {
        Label: "Settings",
        Icon: Settings,
        href: "/settings",
    }
];

export function Sidebar({
  isMobile = false,
  open = true,
}: {
  isMobile?: boolean;
  open?: boolean;
}) {
  const pathname = usePathname();

  const containerClasses = isMobile
    ? "w-full min-h-full"
    : `hidden ${open ? "md:flex" : "md:hidden"} md:w-72`;

  return (
    <aside className={`${containerClasses} ml-0 bg-blue-950 font-inter flex flex-col items-center justify-start gap-4 py-8`}>
      <div className="flex flex-col items-stretch justify-start gap-4 py-8 w-full px-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.Icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="w-full text-base font-semibold text-white">
              <Button variant={isActive ? "secondary" : "ghost"} size="default" className="w-full justify-start gap-2">
                <Icon className="h-4 w-4" />
                {item.Label}
              </Button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
} 

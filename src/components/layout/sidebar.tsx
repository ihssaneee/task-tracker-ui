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

export function Sidebar() {

    const pathname = usePathname();

    return ( 

        <aside className="w-30 ml-0 h-screen bg-blue-950 font-inter">
            <div className="flex flex-col items-center justify-start gap-4 py-8">
                {NAV_ITEMS.map((item) =>{
                    const Icon= item.Icon;
                    const isActive = pathname === item.href;
                    return(
                       <Link key={item.href}
                            href={item.href}
                            className="w-full text-2xl font-bold text-white"
                            >
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                size="default"
                                className="w-full"
                            >
                          <Icon className="h-4 w-4" />
                                {item.Label}
                            </Button>
                        </Link>
                            
                    )
})}
            </div>
        </aside>

    )
}

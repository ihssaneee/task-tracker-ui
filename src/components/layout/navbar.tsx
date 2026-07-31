"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";


export function Navbar() {
    return(
        <div className="border-b bg-zinc-100 h-16">
            <div className="">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="ml-2 md:hidden " size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className=" p-0">
                        <div className="font-bold text-lg p-6 border-b text-primary">
              
            </div>
                        <Sidebar />
                    </SheetContent>

                </Sheet>
            </div>
        </div>
    )
}
"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type NavProps } from "../navbar";

export function MobileNav({ user }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-3">
        <SheetHeader className="flex items-start">
          <SheetTitle className="font-poppins text-xl">
            <Link
              href="/"
              className="mr-6 flex items-center space-x-2 text-xl"
              onClick={() => setOpen(false)}
            >
              Doctor
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-3 flex flex-col gap-6 text-sm">
          {user?.isAdmin && (
            <Link
              href="/create-user"
              className={cn(
                "transition-colors hover:text-foreground/80 ",
                pathname === "/create-user"
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-base"
              >
                Create User
                <div
                  className={cn(
                    "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                    pathname === "/create-user" && "opacity-100",
                  )}
                />
              </Button>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

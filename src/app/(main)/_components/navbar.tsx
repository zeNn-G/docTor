"use client";

import Link from "next/link";
import { User } from "lucia";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import { useSession } from "@/providers/session-provider";
import { UserAvatar } from "./user-avatar";

import { MainNav, MobileNav } from "./nav";

export type NavProps = {
  user: User | null;
};

export function Navbar() {
  const { user } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav user={user} />
        <MobileNav user={user} />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none" />
          <nav className="flex items-center">
            {user ? (
              <UserAvatar user={user} />
            ) : (
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

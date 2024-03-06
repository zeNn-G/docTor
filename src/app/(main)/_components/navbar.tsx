"use client";

import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import { useSession } from "@/providers/session-provider";
import { UserAvatar } from "./user-avatar";

export function Navbar() {
  const { user } = useSession();

  return (
    <nav className="flex py-3">
      <h1 className="font-geist text-2xl font-bold">Doctor</h1>
      <div className="flex-grow" />
      <div className="flex items-center gap-3 ">
        {user ? (
          <UserAvatar user={user} />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}

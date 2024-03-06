"use client";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";

import { useSession } from "@/providers/session-provider";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user } = useSession();

  return (
    <nav className="flex p-3">
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

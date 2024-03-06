import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type NavProps } from "../navbar";

export function MainNav({ user }: NavProps) {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden text-2xl font-bold sm:inline-block">
          Doctor
        </span>
      </Link>
      <nav className="text-md flex items-center gap-6">
        {user?.isAdmin && (
          <Link
            href="/create-user"
            className={cn(
              "transition-colors hover:text-foreground/80 ",
              pathname === "/create-user"
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Create User
          </Link>
        )}
      </nav>
    </div>
  );
}

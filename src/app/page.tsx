import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import { ModeToggle } from "@/components/mode-toggle";
import { validateRequest } from "@/lib/validate-request";

export default async function Home() {
  noStore();

  const { user } = await validateRequest();

  return (
    <main>
      <ModeToggle />
      <pre>{JSON.stringify(user)}</pre>
    </main>
  );
}

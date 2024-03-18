import React from "react";
import { Navbar } from "./_components/navbar";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validate-request";

const MainLayout = async ({ children }: React.PropsWithChildren) => {
  const { user } = await validateRequest();

  if (!user) redirect("/sign-in");

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="my-2 flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;

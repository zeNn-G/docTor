import React from "react";
import { Navbar } from "./_components/navbar";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="container my-2 max-w-screen-2xl flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;

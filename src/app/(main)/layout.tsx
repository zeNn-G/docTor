import React from "react";
import { Navbar } from "./_components/navbar";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="container">
      <Navbar />
      {children}
    </main>
  );
};

export default MainLayout;

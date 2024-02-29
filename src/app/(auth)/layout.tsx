import React from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      {children}
    </section>
  );
};

export default AuthLayout;

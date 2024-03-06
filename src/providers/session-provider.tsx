"use client";

import React from "react";
import { validateRequest } from "@/lib/validate-request";

type ContextType = Awaited<ReturnType<typeof validateRequest>>;
const SessionContext = React.createContext<ContextType>({
  session: null,
  user: null,
});

export const SessionProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: ContextType }>) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => React.useContext(SessionContext);

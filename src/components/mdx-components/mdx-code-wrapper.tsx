import React from "react";

type Props = {
  children: React.ReactNode;
};

export function CodeWrapper({ children }: Props) {
  return <div className="relative">{children}</div>;
}

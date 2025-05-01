"use client";

import { ReactNode } from "react";

interface ReactQueryProviderProps {
  children: ReactNode;
}

export default function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  // No provider needed since we won't use react-query
  return <>{children}</>;
}

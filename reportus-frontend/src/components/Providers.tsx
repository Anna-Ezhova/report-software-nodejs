"use client";

import React from "react";
// import { ThemeProvider } from './Theme'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        {/* <ThemeProvider> */}
        {children}
        {/* </ThemeProvider> */}
      </Suspense>
    </QueryClientProvider>
  );
};

export default Providers;

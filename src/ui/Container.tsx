import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-8 md:gap-12 lg:gap-16 pt-20 px-4 md:px-10 lg:px-20">
      {children}
    </main>
  );
}

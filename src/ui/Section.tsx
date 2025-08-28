import React, { ReactNode } from "react";

export default function Section({
  children,
  title,
  subtitle,
  className,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <section className={`${className} w-full flex flex-col`}>
      <h1 className="text-2xl md:text-3xl lg:text-4xl">{title}</h1>
      <p className="text-base md:text-xl lg:text-2xl opacity-70">{subtitle}</p>
      {children}
    </section>
  );
}

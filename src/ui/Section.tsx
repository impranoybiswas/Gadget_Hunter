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
    <section className={`w-full flex flex-col items-center`}>
      {title && <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 font-semibold">{title}</h1>}
      {subtitle && <p className="text-sm md:text-base lg:text-lg opacity-70 mb-7">{subtitle}</p>}
      <div className={`${className} w-full`}>{children}</div>
    </section>
  );
}

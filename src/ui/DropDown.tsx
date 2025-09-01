"use client";
import React from "react";

interface DropDownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  bgClass?: string;
}

export default function DropDown({ label, children, bgClass }: DropDownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative py-2">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>{label}</div>

      <div>
        <div
          className={`absolute -left-10 -translate-x-1/2 min-w-50 min-h-10 -z-1 transition-all duration-300 ease-in-out rounded-sm shadow-sm ${
            isOpen
              ? "translate-y-0 top-17 scale-100 opacity-100"
              : "-translate-y-full top-0 scale-0 opacity-50"
          } ${bgClass}`}
        >
          <div className="absolute -top-2 right-8 rotate-45 rounded bg-inherit size-5" />
          {children}
        </div>
      </div>
    </div>
  );
}

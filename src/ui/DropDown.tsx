"use client";
import React from "react";

interface DropDownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function DropDown({ label, children, className }: DropDownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>{label}</div>

      <div>
        <div
          className={`absolute right-0 min-w-50 min-h-10 -z-1 rounded-b-md transition-all duration-300 ease-in-out shadow-md pt-2 ${
            isOpen
              ? "translate-y-0 top-12 opacity-100"
              : "-translate-y-full top-0  opacity-50"
          } ${className}`}
        >
          {/* <div className="absolute -top-2 right-8 rotate-45 rounded bg-inherit size-5" /> */}
          {children}
        </div>
      </div>
    </div>
  );
}

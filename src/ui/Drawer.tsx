"use client";
import React from "react";
interface DropDownProps {
  label: React.ReactNode;
  lebelClose?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Drawer({
  label,
  lebelClose,
  children,
  className,
}: DropDownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? lebelClose || label : label}
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className={`absolute top-14 right-0 z-50 h-dvh ${className} transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "w-full p-4" : "w-0 p-0"}`}
      >
        {children}
      </div>
    </>
  );
}

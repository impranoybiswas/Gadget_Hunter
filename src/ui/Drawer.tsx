"use client";
import React from "react";
import { RiCloseLargeLine } from "react-icons/ri";

interface DropDownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Drawer({ label, children, className }: DropDownProps) {
  const [isOpen, setIsOpen] = React.useState(false);


  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>{label}</div>

      <div onClick={() => setIsOpen(false)} className={`absolute top-0 right-0 z-40 w-full h-dvh ${className} transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsOpen(false)} ><RiCloseLargeLine /></div>
        <div className="px-5 py-10">
            {children}
        </div>
        
      </div>
    </>
  );
}

"use client";
import React from "react";
interface DropDownProps {
  label: React.ReactNode;
  lebelClose?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Drawer({ label, lebelClose, children, className }: DropDownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div 
        className="cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? lebelClose || label : label}
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className={`absolute top-16 right-0 z-40 h-[calc(100dvh-64px)] ${className} transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "w-full " : "w-0"}`}>
          <div className={`absolute top-0 right-0 bg-warning h-full p-4 
            duration-500 ease-in-out  
            ${isOpen ? "w-full " : "w-0"}`}>
            {children}
          </div>
        
      </div>
    </>
  );
}

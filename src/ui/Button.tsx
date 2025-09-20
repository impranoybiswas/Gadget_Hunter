"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isOutline: boolean;
  isLarge: boolean;
}

export default function Button({
  onClick,
  type = "button",
  className,
  label,
  leftIcon,
  rightIcon,
  isOutline,
  isLarge,
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={onClick}
      type={type}
      className={`rounded-md relative overflow-hidden group text-shadow-2xs z-0 flex justify-center items-center font-semibold cursor-pointer transition-all duration-500 ease-in-out group 
        ${label && "px-3 gap-2"}
        ${isOutline ? "bg-transparent text-primary border-primary scale-[0.950]" : "bg-primary text-white border-transparent"}
        ${isLarge ? "h-12 text-xl" : "h-8 text-sm"} ${className}
        `}
    >
      {!isOutline && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0 w-0 z-2 scale-150 bg-blue-700 group-hover:w-full group-hover:h-full transition-all duration-800 ease-in-out shadow-sm group-hover:rounded-full"/>
      )}
      {leftIcon}
      <span className="z-2">{label}</span>
      {rightIcon}
    </motion.button>
  );
}

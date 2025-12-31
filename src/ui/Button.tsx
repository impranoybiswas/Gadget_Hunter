"use client";

import { ReactNode } from "react";
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
  disabled?: boolean;
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
  disabled,
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`relative overflow-hidden group z-0 flex justify-center items-center font-semibold cursor-pointer transition-all duration-500 ease-in-out group
        ${label && "px-3 gap-2"}
        ${isOutline ? "bg-transparent text-primary border-[0.05rem] border-primary hover:bg-primary hover:text-white scale-[0.950]" : "bg-primary text-white border-transparent"}
        ${isLarge ? "h-11 text-base rounded-lg" : "h-8 text-sm rounded-md"} ${className}
        `}
    >
      {!isOutline && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0 w-0 z-2 scale-150 bg-[#191a57] group-hover:w-full group-hover:h-full transition-all duration-800 ease-in-out shadow-sm group-hover:rounded-full"/>
      )}
      
      <span className="z-2">{leftIcon}</span>
      <span className="z-2">{label}</span>
      <span className="z-2">{rightIcon}</span>
      
    </motion.button>
  );
}

"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LuLoader } from "react-icons/lu";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: ReactNode; // Alternative for simple icon buttons
  isOutline?: boolean;
  isLarge?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
}

/**
 * Professional Button Component
 * 
 * Features:
 * - Smooth framer-motion animations
 * - Loading states with spinners
 * - Outline and Solid variants
 * - Flexible sizing and icons
 */
export default function Button({
  onClick,
  type = "button",
  className = "",
  label,
  leftIcon,
  rightIcon,
  icon,
  isOutline = false,
  isLarge = false,
  disabled,
  isLoading = false,
  isFullWidth = false,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      onClick={isDisabled ? undefined : onClick}
      type={type}
      disabled={isDisabled}
      className={`
        relative overflow-hidden flex justify-center items-center font-bold transition-all duration-300 ease-out active:shadow-inner
        ${isFullWidth ? "w-full" : "w-fit"}
        ${isLarge ? "h-12 px-8 text-base rounded-xl" : "h-10 px-5 text-sm rounded-lg"}
        ${label || icon || leftIcon || rightIcon ? "gap-2" : "p-0"}
        ${isOutline
          ? "bg-transparent text-primary border-2 border-primary hover:bg-primary/10 shadow-sm"
          : "bg-primary text-primary-content border-transparent shadow-md hover:shadow-primary/30"
        }
        ${isDisabled ? "opacity-50 cursor-not-allowed grayscale-[0.5]" : "cursor-pointer"}
        ${className}
      `}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit z-10">
          <LuLoader className="animate-spin" size={isLarge ? 20 : 16} />
        </div>
      )}

      {/* Content */}
      <div className={`flex items-center gap-2 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {(leftIcon || icon) && <span className="flex-shrink-0">{leftIcon || icon}</span>}
        {label && <span>{label}</span>}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </div>

      {/* Subtle Shine Effect (Solid only) */}
      {!isOutline && !isDisabled && (
        <div className="absolute inset-0 w-1/4 h-full bg-base-content/10 skew-x-[-25deg] -translate-x-full group-hover:animate-shine" />
      )}
    </motion.button>
  );
}

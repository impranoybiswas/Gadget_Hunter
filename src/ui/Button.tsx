import React, { ReactNode } from "react";

export default function Button({
  onClick,
  type,
  leftIcon,
  rightIcon,
  label,
  className,
}: {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-primary hover:bg-secondary rounded-sm h-10 px-5 flex items-center justify-center gap-2 group text-white cursor-pointer transition-all duration-300 ease-in-out`}
      type={type}
    >
      <span className="group-hover:scale-110 transition-all duration-300 ease-in-out">
        {leftIcon}
      </span>
      <span className="font-medium text-base">{label}</span>
      <span className="group-hover:translate-x-1 transition-all duration-300 ease-in-out">
        {rightIcon}
      </span>
    </button>
  );
}

"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import React, { useContext } from "react";
import { PiMoon, PiSun } from "react-icons/pi";
import IconButton from "@/ui/IconButton";

export default function ThemeToggler({ className }: { className?: string }) {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <IconButton
      onClick={toggleTheme}
      className={className}
      title={`Toggle ${theme === "light" ? "Dark" : "Light"}`}
      icon={theme === "light" ? <PiMoon /> : <PiSun />}
    />
  );
}

"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import React, { useContext } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";


export default function ThemeToggler({className}: {className?:string}) {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <div
      role="button"
      className={`${className}`}
      title={`Toggle ${theme === "light" ? "Dark" : "Light"}`}
      onClick={toggleTheme}
    >
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </div>
  );
}

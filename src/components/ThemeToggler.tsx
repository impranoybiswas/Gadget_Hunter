"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import React, { useContext } from "react";
import { CiDark, CiLight } from "react-icons/ci";


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
      {theme === "light" ? <CiDark /> : <CiLight />}
    </div>
  );
}

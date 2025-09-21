"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import React, { useContext } from "react";
import { PiMoon, PiSun } from "react-icons/pi";


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
      {/* {theme === "light" ? <PiMoon className={`${theme === "light" ? "translate-y-0" : "translate-y-3"}`} /> : <PiSun />} */}

      <span className={`flex flex-col ${theme === "light" ? "translate-y-0" : "-translate-y-8" } transform transition-all duration-500 ease-in-out` }>
      <span className="size-8 flex justify-center items-center"><PiMoon /></span>
      <span className="size-8 flex justify-center items-center"><PiSun /></span>
      </span>
    </div>
  );
}

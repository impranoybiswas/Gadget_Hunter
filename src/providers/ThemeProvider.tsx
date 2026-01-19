"use client";

import React, { useEffect, useState, createContext, ReactNode } from "react";

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  name?: string;
}

export const PALETTES: Record<string, ColorPalette> = {
  default: {
    name: "Default Blue",
    primary: "#0c94e8",
    secondary: "#edbe25",
    accent: "#260a2e"
  },
  rose: {
    name: "Rose Pink",
    primary: "#e11d48",
    secondary: "#fb7185",
    accent: "#881337"
  },
  emerald: {
    name: "Emerald Green",
    primary: "#10b981",
    secondary: "#34d399",
    accent: "#064e3b"
  },
  violet: {
    name: "Royal Violet",
    primary: "#7c3aed",
    secondary: "#a78bfa",
    accent: "#4c1d95"
  },
  amber: {
    name: "Sunset Amber",
    primary: "#d97706",
    secondary: "#fbbf24",
    accent: "#78350f"
  },
};

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  palette: string;
  setPalette: (name: string) => void;
  applyPalette: (palette: ColorPalette) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [palette, setPaletteState] = useState<string>("default");

  // Helper to apply hex to CSS variables
  const applyPaletteColors = (colors: ColorPalette) => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);

    // Also estimate RGB for transparency if needed (simple hex to rgb)
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };

    const rgb = hexToRgb(colors.primary);
    if (rgb) root.style.setProperty("--primary-rgb", rgb);
  };

  useEffect(() => {
    const getSystemTheme = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme || getSystemTheme();

    const savedPalette = localStorage.getItem("colorPalette") || "default";

    setTheme(initialTheme);
    setPaletteState(savedPalette);

    document.documentElement.setAttribute("data-theme", initialTheme);
    if (PALETTES[savedPalette]) {
      applyPaletteColors(PALETTES[savedPalette]);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setPalette = (name: string) => {
    if (PALETTES[name]) {
      setPaletteState(name);
      localStorage.setItem("colorPalette", name);
      applyPaletteColors(PALETTES[name]);
    }
  };

  const applyPalette = (customPalette: ColorPalette) => {
    applyPaletteColors(customPalette);
  };

  // Don't render until theme is determined (avoids mismatch)
  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, palette, setPalette, applyPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

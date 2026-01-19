"use client";

import React, { useContext, useState, useEffect } from "react";
import { ThemeContext, PALETTES } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import { FiRefreshCcw, FiCheck, FiLayout } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Settings() {
  const context = useContext(ThemeContext)!;
  const { data: session } = useSession();

  const [selectedPalette, setSelectedPalette] = useState("default");
  const [saving, setSaving] = useState(false);

  // Context is always provided by ThemeProvider
  const { palette: currentPalette, setPalette } = context;

  // Initialize state with current context palette
  useEffect(() => {
    setSelectedPalette(currentPalette);
  }, [currentPalette]);

  // Handle auto-save when palette changes
  const applyAndSavePalette = async (key: string) => {
    setSelectedPalette(key);
    setPalette(key); // Instant UI update

    if (session?.user?.email) {
      setSaving(true);
      try {
        await axios.patch("/api/user", { colorPalette: key });
        toast.success(`Theme updated to ${PALETTES[key].name}`, {
          id: "theme-save",
        });
      } catch (error) {
        console.error("Auto-save error:", error);
        toast.error("Failed to sync theme to cloud.");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleReset = async () => {
    await applyAndSavePalette("default");
    toast.success("UI reset to default.", { id: "theme-reset" });
  };

  return (
    <section className="w-full grid grid-cols-1 gap-10">
      {/* Color Palette Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-md rounded-2xl p-6 sm:p-10"
      >
        <div className="flex items-center gap-3 border-b border-base-content/5 pb-4 mb-8">
          <FiLayout className="text-primary text-xl" />
          <div>
            <h2 className="text-xl font-bold">Visual Themes</h2>
            <p className="text-sm text-base-content/50">
              Select a combination to automatically update and save your theme.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(PALETTES).map((key) => (
            <label
              key={key}
              onClick={() => applyAndSavePalette(key)}
              className={`
                  relative cursor-pointer group rounded-2xl p-4 border-2 transition-all duration-300
                  ${selectedPalette === key ? "border-primary bg-primary/5 shadow-lg" : "border-base-content/5 hover:border-primary/30 bg-base-200/30"}
                `}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`font-bold text-sm ${selectedPalette === key ? "text-primary" : "text-base-content/70"}`}
                >
                  {PALETTES[key].name}
                </span>
                {selectedPalette === key && (
                  <div className="bg-primary text-primary-content rounded-full p-1 animate-in zoom-in duration-300">
                    <FiCheck className="text-xs" />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <div
                  className="size-8 rounded-lg shadow-sm"
                  style={{ backgroundColor: PALETTES[key].primary }}
                  title="Primary"
                ></div>
                <div
                  className="size-8 rounded-lg shadow-sm"
                  style={{ backgroundColor: PALETTES[key].secondary }}
                  title="Secondary"
                ></div>
                <div
                  className="size-8 rounded-lg shadow-sm"
                  style={{ backgroundColor: PALETTES[key].accent }}
                  title="Accent"
                ></div>
              </div>

              <input
                type="radio"
                name="palette"
                checked={selectedPalette === key}
                onChange={() => {}}
                className="hidden"
              />
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 pt-8 border-t border-base-content/5 flex flex-wrap gap-4 justify-between items-center">
          <button
            onClick={handleReset}
            className="btn btn-ghost px-6 rounded-xl gap-2 hover:bg-base-300"
          >
            <FiRefreshCcw />
            Reset All to Default
          </button>
          {saving && <span className="text-xs font-semibold text-primary animate-pulse">Syncing to cloud...</span>}
        </div>
        
      </motion.div>
    </section>
  );
}

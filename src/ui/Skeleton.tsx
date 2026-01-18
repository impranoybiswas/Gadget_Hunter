"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "rectangle" | "circle" | "text";
}

/**
 * Professional Skeleton Component
 * 
 * Features:
 * - Subtle shimmer/pulse animation
 * - Multiple layout variants
 * - Consistent color palette with the site's dark mode
 */
export default function Skeleton({ className = "", variant = "rectangle" }: SkeletonProps) {
  const baseClass = "relative overflow-hidden bg-base-200";

  const variantClasses = {
    rectangle: "rounded-2xl",
    circle: "rounded-full",
    text: "rounded-lg h-4 w-full",
  };

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    >
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-base-content/10 to-transparent shadow-2xl" />
    </div>
  );
}

"use client";
import { ReactLenis } from "lenis/react";

/**
 * SmoothScrolling Component
 * 
 * This component wraps the application with Lenis smooth scrolling.
 * It provides a modern, high-quality scrolling experience.
 * 
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be wrapped
 * @returns {JSX.Element} The Lenis provider wrapping the children
 */
function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { CgClose } from "react-icons/cg";

type ControlledModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

/**
 * ControlledModal Component
 * 
 * A modal whose open/closed state is managed by the parent component.
 * Ideal for forms where the modal needs to close programmatically after success.
 */
export default function ControlledModal({
  isOpen,
  onClose,
  title,
  children
}: ControlledModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-base-content/5">
              <h3 className="text-xl font-bold text-base-content">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="size-10 rounded-full flex items-center justify-center text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors cursor-pointer"
              >
                <CgClose size={22} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { CgClose } from "react-icons/cg";

type ModalProps = {
  lebel: ReactNode;
  children: ReactNode;
};

export default function Modal({ lebel, children }: ModalProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full h-full">
      {/* Trigger */}
      <div onClick={() => setShowModal(true)}>{lebel}</div>

      {/* Overlay */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur flex justify-center items-center z-50"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
            className="bg-white rounded-lg shadow-lg p-6 max-w-full w-[90%] sm:w-96 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 size-8 rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer flex items-center justify-center text-gray-600"
            >
              <CgClose size={20} />
            </button>

            {/* Modal Content */}
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
}

"use client";

import { ReactNode, useState } from "react";

export default function Modal({
  lebel,
  children,
  disabled = true,
}: {
  lebel: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full h-full relative z-100">
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className="bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center justify-center text-lg py-3 px-5 gap-2 cursor-pointer shadow-sm group"
      >
        {lebel}
      </button>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-100"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-md">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

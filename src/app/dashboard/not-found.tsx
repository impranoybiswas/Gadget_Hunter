"use client";

import { FiAlertCircle } from "react-icons/fi";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <FiAlertCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-4">
        Sorry, the page you are looking for does not exist in the dashboard.
      </p>
      <Link
        href="/dashboard"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

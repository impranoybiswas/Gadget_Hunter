"use client";

import { FiAlertCircle } from "react-icons/fi";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <FiAlertCircle className="text-error w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-base-content">Page Not Found</h1>
      <p className="text-base-content/60 mb-8 max-w-md">
        Sorry, the page you are looking for does not exist in the dashboard.
      </p>
      <Link
        href="/dashboard"
        className="btn btn-primary"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

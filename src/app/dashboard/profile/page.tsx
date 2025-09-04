"use client";
import React from "react";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";

export default function ProfilePage() {
  const { currentUser, isLoading } = useUserData();

  if (isLoading) {
    return (
      <section className="p-6 flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </section>
    );
  }

  if (!currentUser) {
    return (
      <section className="p-6 flex justify-center items-center">
        <p className="text-red-500 text-lg">No profile data available.</p>
      </section>
    );
  }

  const { name, email, gender, image } = currentUser;

  return (
    <section className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-2">
        My Profile
      </h1>

      {/* Card */}
      <div className="flex flex-col md:flex-row items-start gap-6 bg-white rounded-lg shadow-md p-6 border">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <Image
            src={image || "/images/avatar-placeholder.png"}
            alt={name || "User avatar"}
            width={160}
            height={160}
            className="rounded-lg border object-cover w-40 h-40 bg-gray-100"
          />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col gap-4 text-gray-700 flex-1">
          <div>
            <span className="block text-sm font-medium text-gray-500">
              Name
            </span>
            <p className="text-lg font-semibold">{name || "N/A"}</p>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-500">
              Email
            </span>
            <p className="text-lg font-semibold">{email || "N/A"}</p>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-500">
              Gender
            </span>
            <p className="text-lg font-semibold">{gender || "N/A"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

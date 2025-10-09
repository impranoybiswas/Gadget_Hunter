"use client";

import React from "react";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaVenusMars,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";

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

  const { name, email, gender, image, role, createdAt, lastSignInAt } =
    currentUser;

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 text-gray-800 border-b pb-2">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-start gap-6 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        {/* Profile Image */}
        <div className="flex-shrink-0 relative w-40 h-40 md:w-48 md:h-48">
          <Image
            src={image || "/images/avatar-placeholder.png"}
            alt={name || "User avatar"}
            fill
            className="rounded-xl object-cover border border-gray-200"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1 flex flex-col gap-4 text-gray-700">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <FaUser className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-semibold">{name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaVenusMars className="text-pink-600" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-lg font-semibold capitalize">
                  {gender || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaUserShield className="text-yellow-600" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-semibold capitalize">{role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="text-lg font-semibold">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Last Sign In</p>
                <p className="text-lg font-semibold">
                  {new Date(lastSignInAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import SiteTitle from "@/customs/SiteTitle";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars, FaSignOutAlt, FaUserEdit } from "react-icons/fa";

const sidebarLinks = [
  { name: "Home", href: "/dashboard", icon: <FaHome /> },
  { name: "Profile", href: "/dashboard/profile", icon: <FaUser /> },
  { name: "Edit Profile", href: "/dashboard/edit-profile", icon: <FaUserEdit /> },
  { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-dvh  bg-gray-900 text-white hidden md:flex flex-col shadow-lg transition-all duration-300 ease-in-out  ${collapsed ? "w-16" : "lg:w-60 w-50"}`}>

         {/* Top Section */}
        <div className="w-full h-16 flex items-center justify-start border-b border-gray-700">
          <span onClick={() => setCollapsed(!collapsed)} className="min-w-16 flex items-center justify-center text-lg cursor-pointer"><FaBars /></span>
          <SiteTitle className="text-white text-base lg:text-lg whitespace-nowrap" />
        </div>

        {/* Navigation Links */}
        {
          sidebarLinks.map((link) => (
            <Link key={link.name} href={link.href} className={`w-full h-12 flex items-center justify-start hover:bg-gray-800 cursor-pointer ${pathname === link.href ? "bg-gray-800 text-blue-400" : ""}`}>
          <span onClick={() => setCollapsed(!collapsed)} className="min-w-16 flex items-center justify-center text-lg">{link.icon}</span>
          <span className={`h-8 whitespace-nowrap items-center ${collapsed ? "hidden" : "flex"}`}>{link.name}</span>
        </Link>
          )) 
        }

        {/* Sign Out */}
        <div className=" flex flex-1 items-end pb-4">
        <button onClick={() => signOut()} className="w-full h-12 flex items-center justify-start hover:bg-gray-800 cursor-pointer">
          <span onClick={() => setCollapsed(!collapsed)} className="min-w-16 flex items-center justify-center text-lg"><FaSignOutAlt /></span>
          <span className={`h-8 whitespace-nowrap flex items-center`}>Sign Out</span>
        </button>
        </div>
      
    </div>
  );
}

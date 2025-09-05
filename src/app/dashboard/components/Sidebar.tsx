"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars, FaSignOutAlt, FaUserEdit, FaPlus } from "react-icons/fa";

export const sidebarLinks = [
  { name: "Home", href: "/dashboard", icon: <FaHome /> },
  { name: "Profile", href: "/dashboard/profile", icon: <FaUser /> },
  { name: "Edit Profile", href: "/dashboard/edit-profile", icon: <FaUserEdit /> },
  { name: "Add Product", href: "/dashboard/add-product", icon: <FaPlus/> },
  { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`min-h-[calc(100dvh-64px)] sticky top-0 mt-16 bg-gray-900 text-white hidden md:flex flex-col shadow-lg border-r border-gray-700 transition-all duration-300 ease-in-out  ${collapsed ? "w-16" : "lg:w-60 w-50"}`}>

         {/* Top Section */}
        <div className="w-full h-16 flex items-center justify-start border-b border-gray-700">
          <span onClick={() => setCollapsed(!collapsed)} className="min-w-16 flex items-center justify-center text-lg cursor-pointer"><FaBars /></span>
          <div className={`text-white text-base lg:text-lg font-semibold whitespace-nowrap transform transition-all duration-300 ease-in-out ${collapsed ? "opacity-0" : "opacity-100"}`}>Dashboard</div>
        </div>

        {/* Navigation Links */}
        {
          sidebarLinks.map((link) => (
            <Link key={link.name} href={link.href} className={`w-full h-12 flex items-center justify-start hover:bg-gray-800 cursor-pointer ${pathname === link.href ? "bg-gray-800 text-blue-400" : ""}`}>
          <span className="min-w-16 flex items-center justify-center text-lg">{link.icon}</span>
          <span className={`h-8 whitespace-nowrap flex items-center transform transition-all duration-300 ease-in-out ${collapsed ? "opacity-0" : "opacity-100"}`}>{link.name}</span>
        </Link>
          )) 
        }

        {/* Sign Out */}
        <div className=" flex flex-1 items-end pb-4">
        <button onClick={() => signOut()} className="w-full h-12 flex items-center justify-start hover:bg-gray-800 cursor-pointer">
          <span onClick={() => setCollapsed(!collapsed)} className="min-w-16 flex items-center justify-center text-lg"><FaSignOutAlt /></span>
          <span className={`h-8 whitespace-nowrap flex items-center transform transition-all duration-300 ease-in-out ${collapsed ? "opacity-0" : "opacity-100"}`}>Sign Out</span>
        </button>
        </div>
      
    </div>
  );
}

"use client";
import SiteTitle from "@/customs/SiteTitle";
import { useUserData } from "@/hooks/useUserData";
import Drawer from "@/ui/Drawer";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { sidebarLinks } from "./Sidebar";
import Link from "next/link";

export default function Navbar() {
  const { currentUser, isLoading } = useUserData();
  return (
    <nav className="fixed top-0 right-0 w-full h-16 flex items-center gap-3 bg-gray-900 border-b border-gray-700 text-white p-4 z-50 ">
      


      <SiteTitle className="flex-1 text-xl"/>
      

      <span className="w-full absolute left-0 top-16 bg-gray-900 font-semibold block md:hidden py-2 px-4 border-b border-gray-700 z-50">DASHBOARD</span>

      <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
        {isLoading ? (
          <span className="loading loading-dots loading-md" />
        ) : (
          <>
            <Image
              src={
                currentUser?.image ||
                "./assets/placeholder-profile.svg"
              }
              alt="avatar"
              width={100}
              height={100}
              className="size-6 md:size-8 rounded-md object-cover"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-semibold">{currentUser?.name}</span>
              <span className="text-xs opacity-60">{currentUser?.email}</span>
            </div>
          </>
        )}
      </div>
      <div className="text-2xl size-10 flex md:hidden items-center justify-center">
        <Drawer label={<LuMenu />} className="bg-gray-900 text-white">
        <div className="flex flex-col gap-3 items-end text-xl tracking-[2px] uppercase mt-10">
        {
          sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-4 border-b border-gray-700 pb-2 w-full"
            >
              {link.icon}
              {link.name}
            </Link>
          ))
        }
        </div>

        </Drawer>
      </div>
    </nav>
  );
}

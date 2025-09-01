"use client";
import { useUserData } from "@/hooks/useUserData";
import Drawer from "@/ui/Drawer";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  const { data: user, isLoading } = useUserData();
  return (
    <nav className="h-16 flex items-center justify-center gap-2 bg-gray-900 border-b border-gray-700 text-white p-4 z-50">
      <div className="text-2xl size-10 flex md:hidden items-center justify-center">
        <Drawer label={<LuMenu />} className="bg-gray-900">
          Hello
        </Drawer>
      </div>

      <div className="flex-1 flex items-center gap-2 font-semibold text-lg">
        <MdDashboard />
        DASHBOARD
      </div>
      <div className="flex items-center gap-2">
        {isLoading ? (
          <span className="loading loading-dots loading-md" />
        ) : (
          <>
            <Image
              src={
                user?.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              width={100}
              height={100}
              className="size-8 rounded-full object-cover"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-semibold">{user?.name}</span>
              <span className="text-xs opacity-70">{user?.email}</span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

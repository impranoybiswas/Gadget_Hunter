"use client";
import ThemeToggler from "@/components/ThemeToggler";
import { useUserData } from "@/hooks/useUserData";
import DropDown from "@/ui/DropDown";
import IconButtton from "@/ui/IconButtton";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { PiShoppingCartLight } from "react-icons/pi";

export default function NavController() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <div className="flex-1 flex items-center justify-end gap-2">
      <IconButtton icon={<ThemeToggler />} />
      <IconButtton
        icon={<PiShoppingCartLight />}
        onClick={() => router.push("/dashboard/carts")}
      />
      {status === "loading" ? (
        <span className="loading loading-dots loading-sm" />
      ) : !data ? (
        <GuestAvatar />
      ) : (
        <UserAvatar />
      )}
    </div>
  );
}

export const GuestAvatar = () => {
  return (
    <DropDown
      className="bg-primary text-white"
      label={<IconButtton icon={<AiOutlineUser />} />}
    >
      <div className="flex flex-col gap-2 p-4">
        <Link
          href="/auth/register"
          className="hover:text-secondary transition-all duration-300 ease-in-out flex items-center gap-2 hover:gap-3"
        >
          <span className="text-base font-semibold">Join Us</span>
          <FaArrowRight />
        </Link>
        <Link
          href="/auth/login"
          className="hover:text-secondary transition-all duration-300 ease-in-out flex items-center gap-2 hover:gap-3"
        >
          <span className="text-base font-semibold">Have an Account</span>
          <FaArrowRight />
        </Link>
      </div>
    </DropDown>
  );
};

export const UserAvatar = () => {
  const { currentUser, isLoading } = useUserData();
  if (!currentUser) return null;

  if (isLoading) return <span className="loading loading-dots loading-md" />;
  return (
    <DropDown
      className="bg-base-100"
      label={
        <IconButtton
          icon={
            <Image className="object-cover" src={currentUser.image || ""} alt="avatar" width={100} height={100} />
          }
        />
      }
    >
      <>
      <div className="flex flex-col gap-2 border-b px-4 py-2">
        <h1 className="text-sm font-semibold">{currentUser.name}</h1>
        <p className="text-xs">{currentUser.email}</p>
      </div>
      <Link href={"/dashboard"} className="flex gap-2 border-b px-4 py-2 hover:text-secondary transition-all duration-300 ease-in-out items-center">Dashboard</Link>
      <button onClick={() => signOut()} className="flex w-full gap-2 border-b px-4 py-2 hover:text-secondary transition-all duration-300 ease-in-out items-center">Sign Out</button>
      </>
    </DropDown>
  );
};

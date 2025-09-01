"use client";
import ThemeToggler from "@/components/ThemeToggler";
import { useUserData } from "@/hooks/useUserData";
import DropDown from "@/ui/DropDown";
import IconButtton from "@/ui/IconButtton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function NavController() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="flex-1 flex items-center justify-end gap-2">
      <IconButtton icon={<ThemeToggler />} />
      <IconButtton
        icon={<MdOutlineShoppingCart />}
        onClick={() => router.push("/about")}
      />
      {status === "loading" ? (
        <span className="loading loading-dots loading-sm" />
      ) : !session ? (
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
      bgClass="bg-primary text-white"
      label={<IconButtton icon={<FaUser />} />}
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
  const { data, isLoading } = useUserData();
  if (!data) return null;

  if (isLoading) return <span className="loading loading-dots loading-md" />;
  return (
    <DropDown
      bgClass="bg-primary text-white"
      label={
        <IconButtton
          icon={
            <Image className="object-cover" src={data.image} alt="avatar" width={100} height={100} />
          }
        />
      }
    >
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-sm font-semibold">{data.name}</h1>
        <p className="text-xs">{data.email}</p>
      </div>
    </DropDown>
  );
};

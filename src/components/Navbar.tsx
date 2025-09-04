"use client";
import React, { use } from "react";
import SiteTitle from "@/customs/SiteTitle";
import Link from "next/link";
import NavController from "@/customs/NavController";
import Drawer from "@/ui/Drawer";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import ThemeToggler from "./ThemeToggler";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";

const navLink = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const {session, currentUser} = useUserData();
  return (
    <nav className="w-full h-16 fixed top-0 left-0 z-50 border-b flex items-center justify-center px-4 md:px-10 lg:px-20  bg-base-100">
      {/* Desktop Section */}
      <section className="w-full hidden lg:flex items-center justify-between bg-base-100 h-full">
        <SiteTitle className="flex-1" />
        <div className="flex-4 flex items-center justify-center gap-4">
          {navLink.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-semibold hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <NavController />
      </section>

      {/* Mobile Section */}
      <section className="w-full flex lg:hidden items-center justify-between gap-2">
        <SiteTitle className="flex-1 text-xl" />

        {
(session && currentUser) && (
  <Image className="object-cover size-6 rounded-full border" src={currentUser.image || ""} alt="avatar" width={100} height={100} />
)
        }

        <ThemeToggler className="text-2xl font-semibold"/>

        <Drawer
          label={<HiMenuAlt3 className="text-2xl font-semibold" />}
          lebelClose={<IoClose className="text-2xl font-semibold" />}
          className="bg-gray-900 text-white"
        >
          <div className="flex flex-col gap-3 items-end text-2xl tracking-[2px] uppercase">
          {navLink.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
          </div>
        </Drawer>
      </section>
    </nav>
  );
}

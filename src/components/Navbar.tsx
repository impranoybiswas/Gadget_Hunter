"use client";
import React from "react";
import SiteTitle from "@/customs/SiteTitle";
import Link from "next/link";
import NavController from "@/customs/NavController";
import Drawer from "@/ui/Drawer";
import ThemeToggler from "./ThemeToggler";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import Button from "@/ui/Button";

const navLink = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { session, currentUser } = useUserData();
  return (
    <nav className="w-full h-16 fixed top-0 left-0 z-50 border-b border-base-300 flex items-center justify-center px-4 md:px-10 lg:px-20 bg-base-100 shadow-xs">
      {/* Desktop Section */}
      <section className="w-full hidden lg:flex items-center justify-between bg-base-100 h-full">
        <SiteTitle className="flex-1" />
        <div className="flex-5 flex items-center justify-center gap-4">
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
        <NavController/>
      </section>

      {/* Mobile Section */}
      <section className="w-full flex lg:hidden items-center justify-between gap-2">
        <SiteTitle className="flex-1 text-xl" />

        {session && currentUser && (
          <Image
            className="object-cover size-6 rounded-full border"
            src={currentUser.image || ""}
            alt="avatar"
            width={100}
            height={100}
          />
        )}

        <ThemeToggler className="text-2xl font-semibold" />

        <Drawer
          label={
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"
                >
                  <animate
                    fill="freeze"
                    attributeName="d"
                    dur="0.4s"
                    values="M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19;M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"
                  />
                </path>
              </svg>
            </span>
          }
          lebelClose={
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#000"
                  strokeDasharray="16"
                  strokeDashoffset="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                >
                  <path d="M7 7l10 10">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.4s"
                      values="16;0"
                    />
                  </path>
                  <path d="M17 7l-10 10">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.4s"
                      dur="0.4s"
                      values="16;0"
                    />
                  </path>
                </g>
              </svg>
            </span>
          }
          className="bg-gray-900 text-white"
        >
          <div className="flex flex-col gap-3 items-end text-2xl tracking-[2px] uppercase">
            {navLink.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </Drawer>
      </section>
    </nav>
  );
}

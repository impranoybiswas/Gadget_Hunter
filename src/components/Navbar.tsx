"use client";

import SiteTitle from "@/customs/SiteTitle";
import Link from "next/link";
import NavController from "@/customs/NavController";
import Drawer from "@/ui/Drawer";
import IconButtton from "@/ui/IconButtton";
import { IoClose, IoMenu } from "react-icons/io5";

const navLink = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full h-14 fixed top-0 left-0 z-100 border-b border-base-300 flex items-center justify-center px-4 md:px-10 lg:px-20 bg-base-100 shadow-xs">
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
        <NavController />
      </section>

      {/* Mobile Section */}
      <section className="w-full h-full flex lg:hidden items-center justify-between gap-2 bg-base-100">
        <SiteTitle className="flex-1 text-xl" />

        <NavController />

        <Drawer
          label={<IconButtton icon={<IoMenu />} />}
          lebelClose={<IconButtton icon={<IoClose />} />}
          className="bg-primary text-white"
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

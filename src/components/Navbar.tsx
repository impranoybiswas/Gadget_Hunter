"use client"
import React, { useState } from "react";
import SiteTitle from "@/ui/SiteTitle";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";

const navLink = [
    {name : "Home", href : "/"},
    {name : "About", href : "/about"},
    {name : "Shop", href : "/shop"},
    {name : "Blog", href : "/blog"},
    {name : "Contact", href : "/contact"},
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full h-16 fixed top-0 left-0 border-b border-primary flex items-center justify-center px-4 md:px-10 lg:px-20 z-50 bg-white">
      {/* Desktop Section */}
      <section className="w-full hidden lg:flex items-center justify-between">
    
        <SiteTitle />

        <div className="flex items-center justify-center gap-4 flex-1">
        {navLink.map((link) => (
        <Link
        key={link.name}
        href={link.href}
        className="text-base font-semibold hover:text-primary">
            {link.name}
        </Link>
        ))}
        </div>

        <div className="flex">
            <Link className="btn btn-primary" href="/auth/login">Login</Link>
        </div>
      </section>

      {/* Mobile Section */}
      <section className="w-full flex lg:hidden items-center justify-between">

        <SiteTitle/>
        
        <CgMenuRight onClick={() => setIsOpen(!isOpen)} className="text-2xl font-semibold" />
        <div className={`flex flex-col gap-4 w-40 p-5 flex-1 absolute top-16 right-0 -z-1 bg-primary text-white transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {navLink.map((link) => (
        <Link
        key={link.name}
        href={link.href}
        className="text-xl font-semibold">
            {link.name}
        </Link>
        ))}
        </div>
      </section>
    </nav>
  );
}

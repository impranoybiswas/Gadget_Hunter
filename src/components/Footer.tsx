import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-800 w-full text-white mt-10">
      {/* Top section */}
      <div className="px-4 md:px-10 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Image
            className="h-8 w-auto mb-4"
            src="/title-h.svg"
            alt="logo"
            width={150}
            height={50}
          />
          <p className="text-gray-300 text-sm leading-6">
            Gadget Hunter is your one-stop shop for the latest gadgets, smart
            devices, and accessories. Explore quality tech at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-primary transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="hover:text-primary transition duration-300"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link
                href="/faq"
                className="hover:text-primary transition duration-300"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/returns"
                className="hover:text-primary transition duration-300"
              >
                Returns Policy
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-primary transition duration-300"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-primary transition duration-300"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-primary transition duration-300"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-primary transition duration-300"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="hover:text-primary transition duration-300"
            >
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-slate-900 border-t border-slate-700 py-4 px-4 md:px-10 lg:px-20 text-sm flex flex-col md:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} All rights reserved |{" "}
          <Link
            href="/"
            className="text-primary hover:underline hover:text-secondary transition"
          >
            Gadget Hunter
          </Link>
        </p>
        <p>
          Full Stack Design |{" "}
          <Link
            href="https://impranoybiswas.vercel.app/"
            target="_blank"
            className="text-primary hover:underline hover:text-secondary transition"
          >
            Pranoy Biswas
          </Link>
        </p>
      </div>
    </footer>
  );
}

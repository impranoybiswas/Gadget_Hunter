"use client";

import Container from "@/ui/Container";
import Section from "@/ui/Section";
import React from "react";
import { FaMobile } from "react-icons/fa";
import { FaLaptop, FaHeadphones, FaStar, FaBolt, FaRocket, FaShield } from "react-icons/fa6";

export default function About() {
  return (
    <Container>
      {/* Hero Section */}
      <Section
        title="About Gadget Hunter"
        subtitle="Your Ultimate Destination for Premium Tech Gadgets"
        className="text-center"
      >
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
          At <span className="font-semibold">Gadget Hunter</span>, we are dedicated to connecting tech enthusiasts with the latest, most innovative gadgets. From smartphones and laptops to headphones and smartwatches, our mission is to deliver quality, innovation, and reliability directly to your fingertips.
        </p>
      </Section>

      {/* Our Story Section */}
      <Section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Story</h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Founded with a vision to make cutting-edge technology accessible, reliable, and exciting for everyone, Gadget Hunter curates only the best gadgets from trusted brands. We provide honest reviews, expert guidance, and a seamless shopping experience for tech enthusiasts worldwide.
          </p>
          <div className="flex gap-6 mt-4 text-primary">
            <FaRocket className="text-4xl" />
            <FaBolt className="text-4xl" />
            <FaShield className="text-4xl" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <FaMobile className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Top-Quality Gadgets</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We source only premium gadgets from verified brands to ensure quality, performance, and reliability.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <FaLaptop className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Trusted Reviews</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Honest and insightful reviews to help you make informed technology choices.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <FaHeadphones className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Exceptional Support</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Responsive and knowledgeable customer service ensures a seamless shopping experience.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission Section */}
      <Section className="p-12 bg-gray-50 rounded-xl mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Our Vision & Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all">
            <FaStar className="text-4xl text-primary" />
            <h3 className="font-semibold text-xl">Customer-Centric</h3>
            <p className="text-gray-600 text-sm md:text-base">
              We prioritize delivering the best experience for every tech enthusiast.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all">
            <FaBolt className="text-4xl text-primary" />
            <h3 className="font-semibold text-xl">Innovation</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Bringing the latest technology to your hands quickly and reliably.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all">
            <FaShield className="text-4xl text-primary" />
            <h3 className="font-semibold text-xl">Trust & Quality</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Only verified brands and products, ensuring safety, satisfaction, and peace of mind.
            </p>
          </div>
        </div>
      </Section>
    </Container>
  );
}

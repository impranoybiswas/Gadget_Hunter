"use client";

import Container from "@/ui/Container";
import Section from "@/ui/Section";
import React from "react";
import { FaMobile } from "react-icons/fa";
import {
  FaLaptop,
  FaHeadphones,
  FaStar,
  FaBolt,
  FaRocket,
  FaShield,
} from "react-icons/fa6";

export default function About() {
  return (
    <Container>
      {/* Hero Section */}
      <Section
        title="About Gadget Hunter"
        subtitle="Your ultimate destination for premium tech gadgets"
        className="text-center"
      >
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
          At <span className="font-semibold">Gadget Hunter</span>, we are
          passionate about connecting tech enthusiasts with the latest and most
          innovative gadgets. From smartphones and laptops to headphones and
          smartwatches, our mission is to bring quality, innovation, and
          reliability to your fingertips.
        </p>
        
      </Section>

      {/* Our Story Section */}
      <Section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Story
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Gadget Hunter was founded with a vision to make the latest tech
            accessible, reliable, and exciting for everyone. We curate only the
            best gadgets from trusted brands, provide honest reviews, and ensure
            a seamless shopping experience for tech lovers worldwide.
          </p>
          <div className="flex gap-6 mt-4">
            <FaRocket className="text-4xl text-primary" />
            <FaBolt className="text-4xl text-primary" />
            <FaShield className="text-4xl text-primary" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <FaMobile className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Top-Quality Gadgets</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We source only the best gadgets from trusted brands to ensure
                quality and reliability.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <FaLaptop className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Trusted Reviews</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Honest reviews and recommendations to help you make informed
                tech decisions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <FaHeadphones className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Excellent Support</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Fast and reliable customer service ensures your shopping
                experience is seamless.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission Section */}
      <Section className="p-12 bg-gray-50 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Our Vision & Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all">
            <FaStar className="text-4xl text-primary" />
            <h3 className="font-semibold text-xl">Customer-Centric</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Our focus is on providing the best experience for every gadget
              enthusiast.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all">
            <FaBolt className="text-4xl text-primary" />
            <h3 className="font-semibold text-xl">Innovation</h3>
            <p className="text-gray-600 text-sm md:text-base">
              We bring the latest technology to your hands with speed and
              reliability.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all">
            <FaShield className="text-4xl text-primary" />
            <h3 className="font-semibold text-xl">Trust & Quality</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Only verified brands and products, ensuring safety and
              satisfaction.
            </p>
          </div>
        </div>
      </Section>
    </Container>
  );
}

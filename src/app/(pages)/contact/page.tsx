"use client";

import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Button from "@/ui/Button";
import React, { useState } from "react";
import {FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container>
      {/* Hero / Title */}
      <Section
        title="Contact Us"
        subtitle="We'd love to hear from you"
        className="text-center"
      >
        <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
          Have a question, feedback, or need support? Reach out to Gadget Hunter anytime. Our team is here to assist you.
        </p>
      </Section>

      {/* Contact Info & Form */}
      <Section className="grid grid-cols-1 md:grid-cols-2 gap-10 py-16">
        {/* Contact Details */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 text-base md:text-lg">
            We are always ready to answer your questions or help with your purchases. Contact us through any of the following channels:
          </p>

          <div className="flex flex-col gap-6 text-gray-700">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <span>123 Tech Street, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-primary text-xl" />
              <span>+880 123 456 789</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-primary text-xl" />
              <span>support@gadgethunter.com</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <FaFacebookF className="text-primary text-xl cursor-pointer hover:text-blue-700 transition" />
            <FaTwitter className="text-primary text-xl cursor-pointer hover:text-blue-400 transition" />
            <FaInstagram className="text-primary text-xl cursor-pointer hover:text-pink-500 transition" />
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-50 p-8 rounded-lg shadow hover:shadow-lg transition"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-primary focus:ring-1 focus:ring-primary transition"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-primary focus:ring-1 focus:ring-primary transition"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows={6}
            className="border border-gray-300 rounded-md p-3 focus:outline-primary focus:ring-1 focus:ring-primary transition"
          ></textarea>
          <Button
            type="submit"
            label="Send Message"
            isLarge={true}
            isOutline={false}
            className="bg-primary text-white hover:bg-primary-dark transition-colors py-3 rounded-md mt-2"
          />
        </form>
      </Section>
    </Container>
  );
}

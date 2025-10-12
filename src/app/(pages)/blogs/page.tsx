"use client";

import React, { useState } from "react";
import Container from "@/ui/Container";
import Section from "@/ui/Section";

import Button from "@/ui/Button";
import BlogCard, { Blog } from "@/components/BlogCard";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", content: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.author || !newBlog.content) return;
    const blog: Blog = { ...newBlog, id: Date.now().toString(), date: new Date().toISOString() };
    setBlogs([blog, ...blogs]);
    setNewBlog({ title: "", author: "", content: "" });
  };

  return (
    <Container>
      {/* Hero Section */}
      <Section title="Blogs" subtitle="Read and share tech insights">
        <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto text-center">
          Explore the latest tech trends, gadgets reviews, and insights from our community.
        </p>
      </Section>

      {/* Add New Blog Form */}
      <Section className="py-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Blog</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-primary focus:ring-1 focus:ring-primary transition"
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={newBlog.author}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-primary focus:ring-1 focus:ring-primary transition"
          />
          <textarea
            name="content"
            rows={6}
            placeholder="Blog Content"
            value={newBlog.content}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-primary focus:ring-1 focus:ring-primary transition"
          ></textarea>
          <Button
            type="submit"
            label="Post Blog"
            isLarge={false}
            isOutline={false}
            className="bg-primary text-white hover:bg-primary-dark transition py-3 rounded-md"
          />
        </form>
      </Section>

      {/* Blog Grid */}
      <Section className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">No blogs yet. Be the first to post!</p>
        )}
      </Section>
    </Container>
  );
}

"use client";

import React from "react";

export interface Blog {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>
      </div>
      <div className="flex justify-between items-center text-gray-500 text-sm mt-4">
        <span>By {blog.author}</span>
        <span>{new Date(blog.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

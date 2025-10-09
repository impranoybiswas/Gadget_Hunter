"use client";

import React from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaHeart,
  FaTags,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function DashboardHome() {
  // Dummy data (replace with real API later)
  const totalProducts = 120;
  const totalCarts = 45;
  const totalFavorites = 78;
  const totalCategories = 8;

  const pieData = [
    { name: "Products", value: totalProducts },
    { name: "Carts", value: totalCarts },
    { name: "Favorites", value: totalFavorites },
  ];
  const pieColors = ["#4f46e5", "#16a34a", "#e11d48"];

  const barData = [
    { month: "Jan", products: 30 },
    { month: "Feb", products: 45 },
    { month: "Mar", products: 60 },
    { month: "Apr", products: 40 },
    { month: "May", products: 75 },
    { month: "Jun", products: 90 },
  ];

  return (
    <div className="p-4 space-y-6 overflow-hidden">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold mb-1">Welcome to Dashboard</h2>
        <p className="text-gray-600">Overview of your gadget shop.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
            <FaBoxOpen size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-xl font-bold">{totalProducts}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <FaShoppingCart size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Carts</p>
            <p className="text-xl font-bold">{totalCarts}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center gap-4">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-full">
            <FaHeart size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Favorites</p>
            <p className="text-xl font-bold">{totalFavorites}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <FaTags size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Categories</p>
            <p className="text-xl font-bold">{totalCategories}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribution Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Rectangle/Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Product Added</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="products" fill="#4f46e5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

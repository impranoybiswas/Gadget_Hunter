"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/not-found";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const { status } = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || "/auth/profile";

  // যদি already logged in থাকে, auto redirect
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  if (status === "loading") return <Loading />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl, 
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push(res?.url || callbackUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}

        <div className="mt-6 text-center">
          <p className="mb-2">Or login with</p>
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}

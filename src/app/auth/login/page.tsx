"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/not-found";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const { status } = useSession();
  if (status === "loading") return <Loading/>;
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/auth/profile");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
      <button
        onClick={() => signIn("google", { callbackUrl: "/auth/profile" })}
      >
        Sign in with Google
      </button>
    </div>
  );
}

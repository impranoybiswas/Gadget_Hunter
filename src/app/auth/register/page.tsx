"use client";

import axiosApi from "@/libs/axiosInstance";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const gender = formData.get("gender") as string;
    const photoFile = formData.get("photo") as File;

    if (!name || !email || !password || !photoFile || !gender) {
      toast.error("সব ফিল্ড পূরণ করতে হবে");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "পাসওয়ার্ডে থাকতে হবে অন্তত 6 ক্যারেক্টার, একটি uppercase, একটি lowercase এবং একটি number"
      );
      return;
    }

    // Cloudinary তে আপলোড
    const cloudData = new FormData();
    cloudData.append("file", photoFile);
    cloudData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    let image = "";
    try {
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: cloudData }
      );
      const cloudJson = await cloudRes.json();
      image = cloudJson.secure_url;
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
      return;
    }

    const data = {
      name,
      email,
      password,
      image,
      gender,
    };

    // Backend এ রেজিস্টার
    try {
      const res = await axiosApi.post("/auth/register", data);
      if (res.status === 200) {
        toast.success("রেজিস্টার সম্পন্ন");

        // Auto login
        await signIn("credentials", { redirect: false, email, password });
        router.push("/auth/profile");
      }
    } catch (error: any) {
      if (error.response?.status === 400) toast.error("User already exists");
      else toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <Section className="grid grid-cols-2">
        <div></div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl uppercase">Register</h1>
          <form onSubmit={handleRegister} className="flex flex-col gap-2 mt-4">
            <input type="text" name="name" placeholder="Your Name" className="input input-md w-full input-bordered" />
            <input type="file" name="photo" accept="image/*" className="input input-md w-full input-bordered" />
            <select name="gender" className="input input-md w-full input-bordered">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="email" name="email" placeholder="Your Email" className="input input-md w-full input-bordered" />
            <input type="password" name="password" placeholder="Password" className="input input-md w-full input-bordered" />
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </Section>
    </Container>
  );
}

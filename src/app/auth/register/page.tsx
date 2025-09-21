"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImageUpload } from "@/customs/ImageUpload";
import { FcGoogle } from "react-icons/fc";
import Loading from "@/app/loading";
import Button from "@/ui/Button";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  image: string; // URL from ImageUpload
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const { status } = useSession();

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/auth/profile";

  // Auto redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  if (status === "loading") return <Loading />;

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const { name, email, password, confirmPassword, gender, image } = data;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Confirm password must match the password",
      });
      return;
    }

    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Profile Photo Required",
        text: "Please upload a profile image",
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must have 6+ chars, one uppercase, one lowercase, and one number",
      });
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, gender, image }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Welcome to Gadget Hunter!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Auto login
        await signIn("credentials", { redirect: false, email, password });
        router.push("/auth/profile");
      } else if (res.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "User Already Exists",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again later",
      });
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-100 to-primary/30 p-4">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        <p className="text-center opacity-80 mb-8">
          Join us and explore amazing gadgets!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-base-300 shadow rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-base-300 shadow rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <Controller
            name="image"
            control={control}
            defaultValue=""
            rules={{ required: "Profile image is required" }}
            render={({ field }) => (
              <ImageUpload
                folder="users"
                label="Profile Photo"
                imageUrl={field.value || null}
                onUploadSuccess={(url) => field.onChange(url)}
                className="mb-4"
              />
            )}
          />
          {errors.image && (
            <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
          )}

          {/* Gender */}
          <div>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full border border-base-300 shadow rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-base-300 shadow rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              className="w-full border border-base-300 shadow rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            className="w-full"
            label={isSubmitting || loadingImage ? "Registering..." : "Register"}
            type="submit"
            disabled={isSubmitting || loadingImage}
            isOutline={false}
            isLarge={true}
          />
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-400 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google login */}
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}

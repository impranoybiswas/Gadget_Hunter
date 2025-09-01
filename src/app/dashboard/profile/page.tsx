"use client";
import React from "react";
import Layout from "../components/DashboardLayout";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";

export default function ProfilePage() {
  const { data: user, session, isLoading } = useUserData();

  return (
    <Layout>
      <section className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl p-4 rounded-sm bg-primary text-white uppercase">Profile</h1>
        {
        (!user || isLoading) ? (
          <div className="w-full h-100 flex items-center justify-center"><div className="loading text-primary loading-ring loading-xl" /></div>
        ) : (
          
        <div className="flex w-full relative flex-col md:flex-row gap-4 bg-blue-100 p-4 rounded-sm">
        <Image src={user?.image || ""} className="rounded-sm size-30 md:size-50 lg:size-60 border border-primary object-cover" alt="avatar" width={100} height={100} />

          <div className="flex flex-col gap-2">
          <div className="text-lg"><b>Name :</b> {user?.name}</div>
          <div className="text-lg"><b>Email :</b> {user?.email}</div>
          <div className="text-lg"><b>Gender :</b> {user?.gender}</div>
          </div>

        </div>
        )
      }
      </section>
    </Layout>
  );
}

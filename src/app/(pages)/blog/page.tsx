"use client";

import ProtectedLayout from "@/customs/ProtectedLayout";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Image from "next/image";
import React, { useState } from "react";

export default function Blogs() {
  const [count, setCount] = useState(0);
  const { uploadImage, loading } = useCloudinaryUpload("profile_images");
  const [image, setImage] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) setImage(url);
  };
  return (
    <ProtectedLayout>
      <Container>
        <Section>
          {count}
          <button onClick={() => setCount(count + 1)}>+</button>
          <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {loading && <p>Uploading...</p>}
      <Image width={100} height={100} src={image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Uploaded" className="w-32 h-32 object-cover mt-2" />
    </div>
        </Section>
      </Container>
    </ProtectedLayout>
  );
}

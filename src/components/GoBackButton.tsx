import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { FaHome, FaShoppingCart } from "react-icons/fa";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <div className="mt-8 flex gap-4 text-base">
      <Button
        onClick={() => router.push("/")}
        type="button"
        label={"Back to Home"}
        isLarge
        isOutline={false}
        leftIcon={<FaHome />}
      />
      <Button
        onClick={() => router.push("/shop")}
        type="button"
        label={"Browse Products"}
        isLarge
        isOutline
        leftIcon={<FaShoppingCart />}
      />
    </div>
  );
}

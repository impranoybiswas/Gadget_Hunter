"use client";

import Button from "@/ui/Button";
import { useState } from "react";

export function PayButton({ cartTotal }: { cartTotal: number }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          customer: {
            name: "Customer Name",
            email: "customer@example.com",
            address: "Dhaka",
            phone: "01700000000",
          },
        }),
      });

      const text = await res.text();
      console.log("Raw Response:", text);

      const data = JSON.parse(text);

      if (data?.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        alert("Payment initiation failed!");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      isLarge
      isOutline={false}
      className={`min-w-32 ${loading ? "pointer-events-none" : ""}`}
      onClick={handleCheckout}
      disabled={loading}
      label={loading ? "Processing..." : "Pay Now"}
    />
  );
}

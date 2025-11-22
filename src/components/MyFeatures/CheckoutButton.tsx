"use client";

import type { CartItem } from "@/types/product";

interface CheckoutButtonProps {
  cart: CartItem[];
  disabled?: boolean;
}

export default function CheckoutButton({ cart, disabled }: CheckoutButtonProps) {
  const handleCheckout = async () => {
    if (disabled) return alert("Please fill all shipping fields before proceeding.");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error(data.error);
        alert("Payment initialization failed");
      }
    } catch (error) {
      console.error("CHECKOUT_ERROR:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled}
      className={`w-full py-2 rounded-md text-white ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black"
      }`}
    >
      Pay with Stripe
    </button>
  );
}

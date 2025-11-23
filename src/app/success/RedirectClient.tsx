"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";

export default function RedirectClient({
  clearCartOnLoad = false,
}: {
  clearCartOnLoad?: boolean;
}) {
  const router = useRouter();
  const { clearCart } = useCart(); // memoized, stable reference

  const [seconds, setSeconds] = useState(5);

  // Clear cart ONLY once on load if requested
  useEffect(() => {
    if (clearCartOnLoad) {
      clearCart();
    }
  }, [clearCartOnLoad, clearCart]);

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  // Redirect when countdown hits 0
  useEffect(() => {
    if (seconds === 0) {
      router.push("/");
    }
  }, [seconds, router]);

  return (
    <p className="mt-10 text-gray-500">
      Redirecting in <b>{seconds}</b> seconds…
    </p>
  );
}

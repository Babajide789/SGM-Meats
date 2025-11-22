"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-red-600"
      >
        Payment Cancelled 
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-gray-600 max-w-md"
      >
        Your transaction was not completed. You may retry or go back.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <a
          href="/check-out"
          className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Return to Cart
        </a>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}

"use client";


import { HomePage } from "@/components/HomePage";
import { Toaster } from "@/components/ui/sonner";


export default function Home() {
  return (
   
      <div className="min-h-screen flex flex-col">
        <HomePage />
        <Toaster />
      </div>
    
  );
}

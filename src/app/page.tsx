"use client"


import { CheckoutPage } from "@/components/CheckOutPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { ShopPage } from "@/components/ShopPage";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/Context/CartContext";
import { useState } from "react";


export default function Home() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "shop":
        return <ShopPage />;
      case "cart":
        return <CheckoutPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
        {renderPage()}
        <Footer />
        <Toaster />
      </div>
    </CartProvider>
  );
}

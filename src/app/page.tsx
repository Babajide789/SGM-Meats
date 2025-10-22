"use client"


import { CheckoutPage } from "@/components/CheckOutPage";
import { CartProvider } from "@/components/Context/CardContext";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { ShopPage } from "@/components/ShopPage";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";


export default function App() {
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

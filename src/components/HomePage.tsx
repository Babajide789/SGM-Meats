import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ProductCard } from "./ProductCard";
import Image from "next/image";
import { products } from "@/data/products";
import { SkeletonProductCard } from "./MyFeatures/SkeletonCard";
import { useEffect, useState } from "react";


interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);

  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 600);
  return () => clearTimeout(timer);
}, []);


  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
  src="/tomato-ball.jpg"
  alt="Tomato Ball"
  fill
  placeholder="blur"
  blurDataURL="/tomato-ball.jpg"
/>

        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="mb-4">Fresh From Farm to Table</h1>
          <p className="mb-8 max-w-2xl mx-auto">
            Premium quality meats, farm-fresh vegetables, and organic produce delivered to your door. Experience the difference of truly fresh food.
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate("shop")}
            className="bg-white text-black hover:bg-white/90"
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4">Today&apos;s Fresh Picks</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked selection of the freshest meats, vegetables, and seafood
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {isLoading
    ? Array.from({ length: 4 }).map((_, i) => <SkeletonProductCard key={i} />)
    : featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
  }
</div>


        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate("shop")}
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="mb-2">Free Delivery</h3>
              <p className="text-muted-foreground">
                On orders over $50
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="mb-2">Farm Fresh</h3>
              <p className="text-muted-foreground">
                Sourced daily from local farms
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                100% satisfaction guarantee
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

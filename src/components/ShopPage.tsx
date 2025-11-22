"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { products } from "@/data/products";
import { SkeletonProductCard } from "./MyFeatures/SkeletonCard";

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4">Shop All Products</h1>
          <p className="text-muted-foreground">
            Browse our complete collection of premium products
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => {
                setIsLoading(true); // show skeletons when switching category
                setSelectedCategory(category);
                setTimeout(() => setIsLoading(false), 800); 
              }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No products found in this category
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

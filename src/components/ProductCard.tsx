import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { useCart } from "@/Context/CartContext";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          loading="lazy"
          src={product.image}
          alt={product.name}
          fill
          placeholder="blur"
          blurDataURL="/blur-placeholder.jpg" 
          className="object-cover transition-transform group-hover:scale-105 opacity-0 animate-fadeIn"
        />
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3>{product.name}</h3>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{product.rating}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        <p className="text-xl">${product.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addToCart(product)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
